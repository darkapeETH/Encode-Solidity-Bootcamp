// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// Interface: HelloWorldInterface
// - This is an interface that defines the functions that a contract must implement.
// - It acts as a blueprint for other contracts to ensure they have the required functions.
interface HelloWorldInterface {
    function helloWorld() external view returns (string memory);
    function setText(string memory newText) external;
}

// Contract: HelloWorld, implementing HelloWorldInterface
contract HelloWorld is HelloWorldInterface {
    // State variable: text (private)
    string private text;

    // Constructor: It runs only once when the contract is deployed.
    // It sets the initial value of the 'text' variable to "Hello World".
    constructor() {
        text = "Hello World";
    }

    // Function: helloWorld()
    // - It is a public view function, accessible by anyone.
    // - It is declared as 'override' since it's implementing the interface function.
    // - It returns the value of the 'text' variable when called.
    function helloWorld() public view override returns (string memory)  {
        return text;
    }

    // Function: setText(string newText)
    // - It is a public function, accessible by anyone.
    // - It is declared as 'override' since it's implementing the interface function.
    // - It takes a string argument 'newText' and sets the 'text' variable to that value.
    function setText(string memory newText) public override {
        text = newText;
    }
}


