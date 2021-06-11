const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
 networks: {
  development:{
    host: '127.0.0.1',
    port: 8545,
    network_id: '*' // match any netwrok id
  },
   rinkeby: {
     provider: function() {
       return new HDWalletProvider(
        "guard weird moral task muffin hen mesh anchor pen warfare ladder hazard",
         "https://rinkeby.infura.io/v3/a1800fa1e11c43b1ad4d0cb4552d0e4b"
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

