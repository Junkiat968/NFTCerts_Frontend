// var ss = artifacts.require("./SimpleStorage.sol");
var b64 = artifacts.require("./Base64.sol");
// var rc = artifacts.require("./RoleControl.sol");
var sitnft = artifacts.require("./SITNFT.sol");

module.exports = function (deployer) {
  // deployer.deploy(ss);
  deployer.deploy(b64);
  deployer.deploy(sitnft);
};
