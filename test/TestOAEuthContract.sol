import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/OAEuthContract.sol";


contract TestOAEuthContract {
  function testIssueGrant() {
    OAEuthContract myContract = OAEuthContract(DeployedAddresses.OAEuthContract());
    myContract.issueGrant("Testclient");
  }

}
