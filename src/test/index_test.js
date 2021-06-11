const assert = require('assert')
const conv = require('../services/conv')

describe("Test multihash converter", () => {
    const multihash = {
        digest: "0x3078303534313634363064656237366435376166363031626531376537373762",
        hashFunction: "0x12",
        size: "0x20"
    }

    it("converts multihash to base58", () => {
        const base58 = conv.main.multihashToBase58(multihash)
        assert.strictEqual(base58, "QmRbraFoZvxcE1Q4P2SCc2AFMqwRGTFnqYYBh7H2jxaeEd")
    })

    it("converts base58 to multihash", () => {
        const mhash = conv.main.base58ToMultihash("QmRbraFoZvxcE1Q4P2SCc2AFMqwRGTFnqYYBh7H2jxaeEd")
        assert.strictEqual(mhash.digest, multihash.digest)
    })

})