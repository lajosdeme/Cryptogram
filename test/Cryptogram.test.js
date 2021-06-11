const Cryptogram = artifacts.require('Cryptogram')
const assert = require('assert')

contract("Cryptogram", async accounts => {
    it("creates a new nft", async () => {
        await Cryptogram.deployed().then(async instance => {
            const multihash = {
                digest: "0x3078303534313634363064656237366435376166363031626531376537373762",
                hashFunction: "0x12",
                size: "0x20"
            }
            await instance.createCG(multihash).then(async _ => {
                const token = await instance.tokenByIndex(0)
                assert.ok(token)
            })
        })
    })

    it("tries to create an NFT with existing hash", async () => {
        await Cryptogram.deployed().then(async instance => {
            const multihash = {
                digest: "0x3078303534313634363064656237366435376166363031626531376537373762",
                hashFunction: "0x12",
                size: "0x20"
            }
            try {
                await instance.createCG(multihash) 
                assert(false)
            } catch(err) {
                assert(err)
            }
        })
    })

    it("gets multihash", async () => {
        await Cryptogram.deployed().then(async instance => {
            const multihash = await instance.getMultihashByTokenId(1)
            assert.strictEqual(multihash.digest, "0x3078303534313634363064656237366435376166363031626531376537373762")
            assert.strictEqual(multihash.hashFunction, "0x12")
            assert.strictEqual(multihash.size, "0x20")
        })
    })

    it("checks ownership", async () => {
        await Cryptogram.deployed().then(async instance => {
            const owner = await instance.ownerOf(1)
            assert.strictEqual(owner, accounts[0])
        })
    })
})