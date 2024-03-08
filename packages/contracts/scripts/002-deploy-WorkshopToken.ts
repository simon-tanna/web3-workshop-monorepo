import { ethers } from "hardhat";
import * as dotenv from "dotenv";

const { PUBLIC_KEY } = process.env;

async function main() {
  // Create a factory for the contract
  const WorkshopTokenFactory = await ethers.getContractFactory("WorkshopToken");

  console.log("Deploying WorkshopToken...");

  // Deploy the contract
  const deployment = await WorkshopTokenFactory.deploy(PUBLIC_KEY as string);
  const deployedContract = await deployment.waitForDeployment();
  const contractAddress = await deployedContract.getAddress();
  const contractTransaction = deployedContract.deploymentTransaction();

  console.log(
    "WorkshopToken deployed to:",
    contractAddress,
    "Transaction hash: ",
    contractTransaction?.hash
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
