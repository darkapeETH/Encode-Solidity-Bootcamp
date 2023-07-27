// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld {
    string private text;
    // Private state variable 'text' restricts direct access outside the contract.

    address public owner;
    // Public state variable 'owner' stores the address of the contract deployer.

    constructor() {
        text = "Hello World";
        // Constructor: Sets the initial value of 'text' to "Hello World".
        owner = msg.sender;
        // Sets the 'owner' to the address of the contract deployer (the person who deployed the contract).
    }

    function helloWorld() public view returns (string memory) {
        return text;
        // Public view function that returns the value of 'text'.
        // It doesn't modify the contract state (read-only).
    }

    function setText(string calldata newText) public onlyOwner {
        text = newText;
        // Public function to update the value of 'text' with a new string.
        // Can only be called by the contract owner due to the 'onlyOwner' modifier.
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
        // Public function to transfer ownership of the contract to a new address.
        // Can only be called by the contract owner due to the 'onlyOwner' modifier.
    }

    modifier onlyOwner()
    {
        require (msg.sender == owner, "Caller is not the owner");
        _;
        // Modifier: 'onlyOwner'
        // - It ensures that the function can only be executed by the contract owner.
        // - The require statement checks if the sender's address (msg.sender) matches the 'owner'.
        // - If the condition is met, the underscore '_' denotes the location where the modified function is executed.
        // - If the condition fails, the function will revert with an error message.
    }
}