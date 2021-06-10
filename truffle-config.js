const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()

module.exports = {
 networks: {
   rinkeby: {
     provider: function() {
       return new HDWalletProvider(
         process.env.MNEMONIC,
         process.env.RPC_URL
       );
     },
     network_id: 4,
     gas: 4000000
   },
 },

 // Configure  compilers
 compilers: {
   solc: {
      version: "0.6.2",    // Fetch exact version from solc-bin (default: truffle's version)
   }
 },

 db: {
   enabled: false
 }
};

