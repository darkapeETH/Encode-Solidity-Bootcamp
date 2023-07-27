// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld {
    string private text;
    // State variable 'text' is made private to restrict external access.

    constructor() {
        // Constructor: Sets the initial value of 'text' to the result of pureText() function.
        text = pureText();
    }

    // Function: helloWorld()
    // - Public view function that returns the value of 'text'.
    // - It doesn't modify the contract state (read-only).
    function helloWorld() public view returns (string memory) {
        return text;
    }

    // Function: setText(string newText)
    // - Public function to update the value of 'text' with a new string.
    function setText(string calldata newText) public {
        text = newText;
    }

    // Function: pureText()
    // - Public pure function that returns a hardcoded string "Hello World".ssssss
    // - It doesn't modify or read the contract state.
    function pureText() public pure returns (string memory) {
        return "Hello World";
    }

    // Function: _isPure()
    // - Internal view function that checks if the current 'text' matches the result of pureText().
    // - It's accessible only within this contract.
    function _isPure() internal view returns (bool check_) {
        check_ = keccak256(bytes(text)) == keccak256(bytes(pureText()));
    }

    // Function: isPure()
    // - Public view function as a user-friendly interface to check if the contract state is pure.
    // - Calls the internal '_isPure()' function to make the determination.
    function isPure() public view returns (bool returnValue_) {
        returnValue_ = _isPure();
    }

    // Function: _restore()
    // - Internal function to restore the contract state to its initial pure state.
    // - Sets 'text' to the result of pureText() function.
    function _restore() internal {
        text = pureText();
    }

    // Function: restore()
    // - Public function as a user-friendly interface to restore the contract state.
    // - Checks if the contract state is pure using '_isPure()', and restores if needed.
    // - Returns 'true' if restoration is performed, 'false' otherwise.
    function restore() public returns (bool) {
        if (_isPure()) return false;
        _restore();
        return true;
    }
}
