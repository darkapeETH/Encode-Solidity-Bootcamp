import { ethers } from "hardhat";

async function main() {
    const proposals = process.argv.slice(2);
    console.log({proposals});
    console.log("Deploying Ballot contract");
    console.log("Proposals: ");
    proposals.forEach((element, index) => {
      console.log(`Proposal N. ${index + 1}: ${element}`);
    });

    const ballotFactory = await ethers.getContractFactory("Ballot");
    const ballotContract = await ballotFactory.deploy(
    proposals.map(ethers.encodeBytes32String)
    );
    await ballotContract.waitForDeployment();
    const address = await ballotContract.getAddress();
    console.log(`Contract deployed at address ${address}`); // ALT+96 = `
    for (let index = 0; index < proposals.length; index ++) {
      const proposals = await ballotContract.proposals(index);
      const name = ethers.decodeBytes32String(proposals.name);
      console.log({index, name, proposals});
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
 });
