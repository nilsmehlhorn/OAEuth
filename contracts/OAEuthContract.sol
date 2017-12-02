pragma solidity ^0.4.7;

contract OAEuthContract {

  mapping (address => mapping (bytes32 => Grant)) private grants;

  mapping (address => bytes32[]) private subjectGrants;

  struct Grant {
  string target;
  uint issuedAt;
  uint issuerBlock;
  }

  function issueGrant(string target) {
    var hash = calculateHash(target);
    var grant = grants[msg.sender][hash];
    // assemble grant
    grant.target = target;
    grant.issuedAt = block.timestamp;
    grant.issuerBlock = block.number;
    // memorize grant for subject
    subjectGrants[msg.sender].push(hash);
  }

  function getGrant(string queryTarget, address subject) constant
  returns (string target, uint issuedAt, uint issuerBlock) {
    var hash = calculateHash(queryTarget);
    return getGrantByHash(hash, subject);
    // retrieve associated grant
    var grant = grants[subject][hash];
    // make sure the grant is on the chain
    require(grant.issuerBlock != 0);
    // set return values
    target = grant.target;
    issuedAt = grant.issuedAt;
    issuerBlock = grant.issuerBlock;
  }

  function getGrantByHash(bytes32 hash, address subject) constant
  returns (string target, uint issuedAt, uint issuerBlock) {
    var grant = grants[subject][hash];
    // make sure the grant is on the chain
    require(grant.issuerBlock != 0);
    // set return values
    target = grant.target;
    issuedAt = grant.issuedAt;
    issuerBlock = grant.issuerBlock;
  }

  function getSubjectGrants(address subject) constant returns (bytes32[] grants) {
    grants = subjectGrants[subject];
  }

  // UTIL

  function calculateHash(string message) constant returns (bytes32) {
    return sha256(message);
  }
}
