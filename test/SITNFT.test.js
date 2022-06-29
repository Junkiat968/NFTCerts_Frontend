const SITNFT = artifacts.require("SITNFT");

contract("SITNFT", (accounts) => {
  before(async () => {
    instance = await SITNFT.deployed();
  });
  it("ensure total supply is 0 ", async () => {
    let totalSupply = await instance.totalSupply();
    assert.equal(totalSupply, 0, "initial supply should be 0.");
  });
});
