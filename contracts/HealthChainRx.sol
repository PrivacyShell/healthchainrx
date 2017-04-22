pragma solidity ^0.4.8;

contract HealthChainRx {
  uint BLOCKS_PER_DAY = 5760;

  address public owner;

  struct Identity {
      string name;
      string location;
  }

  struct Prescription {
      address doctor;
      uint dateIssued;
      uint expiresInDays;
      uint dateDispensed;
      address dispensingPharmacy;
  }

  mapping (address => Identity) public identities;
  mapping (bytes32 => Prescription) public prescriptions;

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

  function getIdentity(address id) constant returns (string name) {
    return identities[id].name;
  }

  function addPrescription( uint expiresInDays, bytes32 hash) returns (bool success) {
    // TODO: Make sure that the sender in in the identites table, lookup that info to be used
    address doctor = msg.sender;

    prescriptions[hash] = Prescription({
        doctor: doctor,
        dateIssued: block.number,
        expiresInDays: expiresInDays,
        dateDispensed: 0,
        dispensingPharmacy: 0x0
    });
    return true;
  }

  function isPrescriptionExpired(bytes32 hash) returns(bool isExpired){
    if(prescriptions[hash].expiresInDays == 0) return false;

    uint currentBlock = block.number;
    uint blockIssued = prescriptions[hash].dateIssued;
    uint expiredInDays = prescriptions[hash].expiresInDays;
    uint maxBlocks = expiredInDays * BLOCKS_PER_DAY;
    uint blocksSinceIssue = currentBlock - blockIssued;
    return (blocksSinceIssue > maxBlocks);
  }

  function getPrescriptionStatus(bytes32 hash) constant returns (string status) {

      // Does it exist
      if(prescriptions[hash].doctor == 0x0) {
        return "Does not exist";
      }

      // Is it expired
      if(isPrescriptionExpired(hash)) {
        return "It is expired";
      }

      // Has it been filled
      if(prescriptions[hash].dateDispensed != 0) {
        return "It has been dispensed";
      }

      // TODO Insurance company declined

      return "Good";


  }

  function dispensePrescription(bytes32 hash) returns (bool success) {
      // Check prescription status
      if (sha3(getPrescriptionStatus(hash)) != sha3("Good")) {
        return false;
      }

      return true;
  }

}
