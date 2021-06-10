const Cryptogram = artifacts.require('Cryptogram')

module.exports = function(deployer) {
    deployer.deploy(Cryptogram)
}