pragma solidity ^0.4.8;

contract HealthChainRx {

  address public owner;

  struct Identity {
      string name;
  }

  mapping (address => Identity) public identities;
  identities["0xce1ff367bdf1eb16f6ee9f243ff0a55bb71a16ac"] = Identity({name: "joe"});

  function HealthChainRx() {
    owner = msg.sender;
  }

  function addIdentity(string name) returns (bool success){
    identities[msg.sender] = Identity({name: name});
    return true;
  }

  /*function getIdentities() returns (Identity[] memory foo) {
    foo = new address[](1);
    foo[0] = owner;
    return foo;
  }*/

  function prescriptions() {

  }
}
