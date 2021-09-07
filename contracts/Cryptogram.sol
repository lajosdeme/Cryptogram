//SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Cryptogram is ChainlinkClient, ERC721 {
    /* This is used to store the IPFS CID. 
    It is a multihash (https://github.com/multiformats/multihash), consisting of a digest, hash function used and size.

    When we upload the image to IPFS with our oracle the resulting hash is a Base58 encoded string. (46 bytes)
    However, the max we can send back to our contract from the oracle is 32 bytes.
    We can express the hash as hexadecimal, but this is still 34 bytes.
    The size and hash function is always 0x12 (sha2) and 0x20 (256bits), becuase this is the only format used by IPFS.
    If we cut off the first two bytes (hash function used & size) we can squeeze the digest in bytes32.

    From the multihash we can easily restore the Base58 string to query IPFS for the image on the frontend.
    */
    struct Multihash {
        bytes32 digest;
        bytes1 hashFunction;
        bytes1 size;
    }

    bytes1 defHashFunc = 0x12;
    bytes1 defSize = 0x20;

    /* This will store the current multihash */
    Multihash private multihash;

    /* Stores all multihashes */
    mapping(uint256 => Multihash) private _multihashes;

    /* Network: Rinkeby
    Oracle: address of the oracle that hosts the job
    JobId: id of the job
    Fee: 1 LINK
    */
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /* Used for incrementing token ids after token issuance */
    /* Store the digest to ensure token hasn't been created with this hash before */
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(bytes32 => uint8) hashes;

    //Event logs creation of NFT
    event NFTCreated();

    /* Set NFT name & symbol, set up chainlink client */
    constructor() public ERC721("Cryptogram", "CG") {
        setPublicChainlinkToken();
        oracle = ORACLE_ADDRESS;
        jobId = JOB_ID;
        fee = 1 * 10**18; // 1 LINK
    }

    /* Makes a request to the oracle, which gets the picture from instagram and uploads it to IPFS.
    @param {string} endpoint the id of the picture on Instagram
    (i.e. for https://instagram.com/p/CPtoYAMj526 the endpoint is CPtoYAMj526)
     */
    function saveIgImgToIpfs(string memory endpoint)
        public
        returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        request.add("endpoint", endpoint);
        request.add("copyPath", "result");
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /* Response received from oracle
    Creates a multihash and then uses that to create the NFT
     */
    function fulfill(bytes32 _requestId, bytes32 _hash)
        public
        recordChainlinkFulfillment(_requestId)
    {
        multihash = Multihash(_hash, defHashFunc, defSize);
        createCG(multihash);
        emit NFTCreated();
    }

    /* Creates a Cryptogram token:
    Checks if the hash hasn't been used to mint a token before
    Increments the token id
    Mints the new token and adds the multihash to the multihashes
     */
    function createCG(Multihash memory hash) public returns (uint256) {
        require(hashes[hash.digest] != 1);
        hashes[hash.digest] = 1;

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _multihashes[newItemId] = hash;
        return newItemId;
    }

    /* Get the multihash by the token id
    Front-end can use this to reconstruct the IPFS hash and get the image
     */
    function getMultihashByTokenId(uint256 tokenId)
        public
        view
        returns (Multihash memory)
    {
        return _multihashes[tokenId];
    }
}
