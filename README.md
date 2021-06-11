# Cryptogram
Download your pictures from Instagram and create NFTs from them.

This project uses a [Chainlink](https://chain.link/) oracle to download one of your pictures from Instagram, upload it to [IPFS](https://ipfs.io/) and create an [ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) token (non-fungible token or NFT) from them.  
This could potentially be a great way for photographers and creators to truly own their artwork, which includes monetizing and selling/trading it, without relying on the discretion of a third party social media platform like Instagram.

## Architecture diagram 
![cryptogram_architecture](https://user-images.githubusercontent.com/44027725/121721566-b00e1800-cae4-11eb-8724-36efd5f349d6.jpg)

* There is a bare bones front-end for this app built with React JS and Next JS, which can only be run locally at the moment, but can easily be hosted on IPFS later.
* The user communicates with the Ethereum smart contract via [web3.js](https://github.com/ChainSafe/web3.js).
* The contract first makes a request to a [Chainlink](https://chain.link/) oracle. The oracle uses a custom external adapter, for which the code can be found [here](https://github.com/lajosdeme/instagram-external-adapter) to download a picture from Instagram and upload that picture to IPFS.
* The oracle sends back part of the IPFS multihash to the contract, which recreates the full multihash ([more info on this here](https://ethereum.stackexchange.com/a/17112/71979)) and creates an NFT from it. 