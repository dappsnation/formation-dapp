pragma solidity ^0.5.1;

contract Greeter {

    string public message;

    event messageSet(string newMessage);

    constructor(string memory initMessage) public {
        message = initMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
        emit messageSet(newMessage);
    }
}