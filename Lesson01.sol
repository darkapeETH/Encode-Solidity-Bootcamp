// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld {

    constructor() {
        // Constructor: It runs only once when the contract is deployed.
        // This constructor is empty and does not contain any code.
    }

    function helloWorld() public view returns (string memory) {
        // Function: helloWorld()
        // - It is a public function, accessible by anyone.
        // - It's a view function, which means it doesn't modify the contract's state.
        // - It returns a string stored in memory (temporary data, not on the blockchain).
        //   However, the function body is currently empty and doesn't return anything meaningful.
    }
}