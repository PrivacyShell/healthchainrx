pragma solidity ^0.4.8;

contract HealthChainRx {

  address public owner;
  uint temp = 1;

  struct Identity {
      string name;
      string location;
  }

  struct Prescription {
      address doctor;
      uint dateIssued;
      uint expiresInDays;
      string status;
  }

  mapping (address => Identity) public identities;
  mapping (bytes32 => Prescription) public prescriptions;


  function HealthChainRx() {
    owner = msg.sender;
  }

  function addIdentity(string name, string location) returns (bool success) {
    // Validate the sender, only the owner can add identities
    if(msg.sender != owner) throw;
    /*temp = temp + 1;*/
    identities[msg.sender] = Identity({
        name: name,
        location: location
    });
    return true;
  }

  function getIdentity(address id) constant returns (string name) {
    return identities[id].name;
  }

  function addPrescription(uint256 dateIssued, uint expiresInDays, bytes32 hash) returns (bool success) {
    // TODO: Make sure that the sender in in the identites table, lookup that info to be used
    address doctor = msg.sender;

    prescriptions[hash] = Prescription({
        doctor: doctor,
        dateIssued: dateIssued,
        expiresInDays: expiresInDays,
        status: "new"
    });
    return true;
  }

  function getPrescriptionStatus() constant returns (string) {
      // TODO: Lookup status of prescription possible returns are 'new', 'filled', 'expired'

        return "status";
  }

  function dispensePrescription() constant returns (string) {
      // TODO: Call getPrescritionStatus() then update record as needed to

       return "status";
  }


  function prescriptions() {

  }
}
