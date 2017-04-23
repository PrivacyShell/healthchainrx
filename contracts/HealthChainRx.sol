pragma solidity ^0.4.8;

contract HealthChainRx {
  uint BLOCKS_PER_DAY = 5760;

  address public owner;
  string thing;
  string hasher;

  event AddPrescription(address doctor);
  event ShowHash(string hasher);

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

  function setThing(string _thing) returns (string success) {
    thing = _thing;
    address doctor = msg.sender;

    prescriptions[sha3(thing)] = Prescription({
        doctor: doctor,
        dateIssued: block.number,
        expiresInDays: 1,
        dateDispensed: 0,
        dispensingPharmacy: 0x0
    });

    ShowHash(thing);
    return thing;

  }

  function addPrescription(uint expiresInDays, string _hasher) returns (string success) {
    hasher = _hasher;
    address doctor = msg.sender;

    prescriptions[sha3(hasher)] = Prescription({
        doctor: doctor,
        dateIssued: block.number,
        expiresInDays: expiresInDays,
        dateDispensed: 0,
        dispensingPharmacy: 0x0
    });

    //AddPrescription(prescriptions[hasher].doctor);
    ShowHash(hasher);

    return hasher;
  }

  function isPrescriptionExpired(string hasher) returns(bool isExpired){
    if(prescriptions[sha3(hasher)].expiresInDays == 0) return false;

    uint currentBlock = block.number;
    uint blockIssued = prescriptions[sha3(hasher)].dateIssued;
    uint expiredInDays = prescriptions[sha3(hasher)].expiresInDays;
    uint maxBlocks = expiredInDays * BLOCKS_PER_DAY;
    uint blocksSinceIssue = currentBlock - blockIssued;
    return (blocksSinceIssue > maxBlocks);
  }

  function getPrescriptionStatus(string hasher) constant returns (string status) {
      ShowHash(hasher);
      //AddPrescription(prescriptions[hasher].doctor);

      // Does it exist
      if(prescriptions[sha3(hasher)].doctor == 0x0) {
        return "Does not exist";
      }

      // Is it expired
      if(isPrescriptionExpired(hasher)) {
        return "It is expired";
      }

      // Has it been filled
      if(prescriptions[sha3(hasher)].dateDispensed != 0) {
        return "It has been dispensed";
      }

      // TODO Insurance company declined

      return "Good";


  }

  function dispensePrescription(string hasher) returns (bool success) {
      // Check prescription status
      if (sha3(getPrescriptionStatus(hasher)) != sha3("Good")) {
        return false;
      }

      return true;
  }

}
