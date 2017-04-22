pragma solidity ^0.4.8;

contract HealthChainRx {

  address public owner;

  struct Identity {
      string name;
      string location;
  }

  mapping (address => Identity) public identities;

  struct Perscription {
      address doctor;
      uint dateIssued;
      uint expiresInDays;
      string status;
  }

  mapping(bytes32 => Perscription) public perscriptions;


  function HealthChainRx() {
    owner = msg.sender;
  }

  function addIdentity(string name, string location) returns (bool success) {
    // Validate the sender, only the owner can add identities
    if(msg.sender != owner) throw;

    identities[msg.sender] = Identity({
        name: name,
        location: location
    });
    return true;
  }

  function addPerscription(address doctor, uint dateIssued, uint expiresInDays, bytes32 hash) returns (bool success) {
    // TODO: Make sure that the sender in in the identites table, lookup that info to be used

    perscriptions[hash] = Perscription({
        doctor: doctor,
        dateIssued: dateIssued,
        expiresInDays: expiresInDays,
        status: "new"
    });
    return true;
  }

  function getPerscriptionStatus() constant returns (string) {
      // TODO: Lookup status of perscription possible returns are 'new', 'filled', 'expired'

        return "status";
  }

  function dispensePerscription() constant returns (string) {
      // TODO: Call getPerscritionStatus() then update record as needed to

       return "status";
  }


  function prescriptions() {

  }
}
