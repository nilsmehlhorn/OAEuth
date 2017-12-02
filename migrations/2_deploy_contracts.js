var OAEuthContract = artifacts.require("./OAEuthContract.sol");
module.exports = function(deployer, helper, accounts) {
  return deployer.deploy(OAEuthContract)
}
