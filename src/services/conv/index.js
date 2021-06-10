import bs58 from 'bs58'

export default class Conv {
    constructor() {
        this.main = {
            base58ToMultihash: (str) => {
                const decoded = bs58.decode(str)
                console.log(decoded)
                return{
                    digest:`0x${decoded.slice(2).toString('hex')}`,
                    hashFunction: decoded[0],
                    size: decoded[1]
                }
            },

            multihashToBase58: (multihash) => {
                const { digest, hashFunction, size } = multihash;
                if (size === 0) return null;
            
                // cut off leading "0x"
                const hashBytes = Buffer.from(digest.slice(2), 'hex');
            
                // prepend hashFunction and digest size
                const multihashBytes = new (hashBytes.constructor)(2 + hashBytes.length);
                multihashBytes[0] = hashFunction;
                multihashBytes[1] = size;
                multihashBytes.set(hashBytes, 2);
                
                return bs58.encode(multihashBytes);
            }
        }
    }
}