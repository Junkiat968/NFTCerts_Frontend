var b64 = artifacts.require("./Base64.sol");
var sitnft = artifacts.require("./SITNFT.sol");

module.exports = function (deployer) {
  // deployer.deploy(b64);
  deployer.deploy(sitnft);
};
