var ss = artifacts.require("./SimpleStorage.sol");
// var color = artifacts.require("./Color.sol");
// var sitnft = artifacts.require("./SITNFT.sol");

module.exports = function (deployer) {
  deployer.deploy(ss);
  // deployer.deploy(color);
  // deployer.deploy(sitnft);
};
