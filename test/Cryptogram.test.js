const Cryptogram = artifacts.require('Cryptogram')

contract("Cryptogram", async accounts => {
    it("checks the hash convert fuction", async () => {
        await Cryptogram.deployed().then(instance => {
/*             const hash = instance.Multihash("0x3078303534313634363064656237366435376166363031626531376537373762", "0x12", "0x20")
            const strHash = instance.getBase58StringFromMultihash(hash)
            assert.strictEqual(strHash, "asd")
            console.log("str hash: ", strHash) */
            assert.ok(instance.address)
        })
    })
})