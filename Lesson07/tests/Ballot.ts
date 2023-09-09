import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { Ballot } from "../typechain-types";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function deployContract() {
    const ballotFactory = await ethers.getContractFactory("Ballot");
    const ballotContract = await ballotFactory.deploy(
        PROPOSALS.map(ethers.encodeBytes32String)
    );
    await ballotContract.waitForDeployment();
    return ballotContract;
  }


describe("Ballot", async () => {
    let ballotContract: Ballot;
    describe("when the contract is deployed", async () => {
        beforeEach( async () => {
            ballotContract = await loadFixture(deployContract);
        });
        it("has the provided proposals", async () => {
                                //const ballotContract = await loadFixture(deployContract); ** NO NEED TO DEPLOY EACH TIME, THIS IS REPLACED BY THE BEFORE EACH FUNCTION**
            for (let index = 0; index < PROPOSALS.length; index ++) {
                const proposals = await ballotContract.proposals(index);
                expect(ethers.decodeBytes32String(proposals.name)).to.eq(PROPOSALS[index]);
            }
        });
        it("has zero votes for all proposals", async () => {
            //const ballotContract = await loadFixture(deployContract);
            for (let index = 0; index < PROPOSALS.length; index ++) {
                const proposals = await ballotContract.proposals(index);
                expect(proposals.voteCount).to.eq(0);
            }
        });
        it("sets the deployer address as chairperson", async () => {
            //Deploying Contract
            const accounts = await ethers.getSigners();
            const ballotFactory = await ethers.getContractFactory("Ballot");
            const ballotContract = await ballotFactory.deploy(
                PROPOSALS.map(ethers.encodeBytes32String)
            );
            await ballotContract.waitForDeployment();
            //Actually testing > 1st assigning the chairperson from ballot contract to a constat, and then veryfing if it corresponds to account 0 (msg.sender)
            const chairperson = await ballotContract.chairperson();
            expect(chairperson).to.eq(accounts[0].address)
        });
        it("sets the voting weight for the chairperson as 1", async () => {
            //const ballotContract = await loadFixture(deployContract);
            const accounts = await ethers.getSigners();
            const chairpersonVoter = await ballotContract.voters(accounts[0].address);
            expect(chairpersonVoter.weight).to.eq(1);             
        });
    })
    
    describe("when the chairperson interacts with the giveRightToVote function in the contract", async () => {
    it("gives right to vote for another address", async () => {
      // TODO
      throw Error("Not implemented");
    });
    it("can not give right to vote for someone that has voted", async () => {
      // TODO
      throw Error("Not implemented");
    });
    it("can not give right to vote for someone that has already voting rights", async () => {
      // TODO
      throw Error("Not implemented");
    });
  });

  describe("when the voter interacts with the vote function in the contract", async () => {
    // TODO
    it("should register the vote", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when the voter interacts with the delegate function in the contract", async () => {
    // TODO
    it("should transfer voting power", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account other than the chairperson interacts with the giveRightToVote function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account without right to vote interacts with the vote function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account without right to vote interacts with the delegate function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function before any votes are cast", async () => {
    // TODO
    it("should return 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function after one vote is cast for the first proposal", async () => {
    // TODO
    it("should return 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winnerName function before any votes are cast", async () => {
    // TODO
    it("should return name of proposal 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winnerName function after one vote is cast for the first proposal", async () => {
    // TODO
    it("should return name of proposal 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function and winnerName after 5 random votes are cast for the proposals", async () => {
    // TODO
    it("should return the name of the winner proposal", async () => {
      throw Error("Not implemented");
    });
  });

})
