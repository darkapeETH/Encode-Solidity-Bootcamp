import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const proposals = process.argv.slice(2);
    console.log("Deploying Ballot contract");
    console.log("Proposals: ");
    proposals.forEach((element, index) => {
      console.log(`Proposal N. ${index + 1}: ${element}`);
    });

    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    //const lastBlock = await provider.getBlock("latest");
    //console.log({lastBlock});
    //return;

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    //const wallet2 = ethers.Wallet.fromPhrase(process.env.MNEMONIC ?? "", provider);
    //const wallet3 = ethers.Wallet.createRandom(provider)
    
    console.log(`Using address ${wallet.address}`);
    const balanceBN = await provider.getBalance(wallet.address);
    const balance = Number(ethers.formatUnits(balanceBN));
    console.log(`Wallet balance ${balance}`);
    if (balance < 0.01) {
      throw new Error("Not enought ether")
    }

    const ballotFactory = new Ballot__factory(wallet);
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
