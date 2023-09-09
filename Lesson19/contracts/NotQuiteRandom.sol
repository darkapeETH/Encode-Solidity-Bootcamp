// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract NotQuiteRandom {
    function getRandomNumber()
        public
        view
        returns (uint256 notQuiteRandomNumber)
    {
        //TODO: get randommness from block hash
        return uint256 (blockhash(block.number - 1));
    }

    function tossCoin() public view returns (bool heads) {
        // TODO: make the random number be translated to a boolean
        return bool(getRandomNumber() % 2 == 0);
    }
}