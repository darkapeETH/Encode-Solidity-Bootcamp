import { expect } from "chai";
import { ethers } from "hardhat";
import { MyERC20Token } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Basic tests for understanding ERC20", async () => {
  let MyERC20Contract: MyERC20Token;
  let accounts: HardhatEthersSigner[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const MyERC20ContractFactory = await ethers.getContractFactory(
      "MyERC20Token"
    );
    MyERC20Contract = await MyERC20ContractFactory.deploy();
    await MyERC20Contract.waitForDeployment();
  });

  it("should have zero total supply at deployment", async () => {
    const totalSupplyBN = await MyERC20Contract.totalSupply();
    const decimals = await MyERC20Contract.decimals();
    const totalSupply = parseFloat(ethers.formatUnits(totalSupplyBN, decimals));
    expect(totalSupply).to.eq(0);
  });

  it("triggers the Transfer event with the address of the sender whe sending transactions", async function () {
    const senderAddress = accounts[0].address;
    const receiverAddress = accounts[1].address;
    const mintTx = await MyERC20Contract.mint(senderAdrress,2)
    awit mintTx.wait();
  })

});