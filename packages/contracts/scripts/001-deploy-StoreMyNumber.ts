import { ethers } from "hardhat";

async function main() {
  // Create a factory for the contract
  const StoreMyNumberFactory = await ethers.getContractFactory("StoreMyNumber");

  console.log("Deploying StoreMyNumber...");

  // Deploy the contract
  const deployment = await StoreMyNumberFactory.deploy();
  const deployedContract = await deployment.waitForDeployment();
  const contractAddress = await deployedContract.getAddress();
  const contractTransaction = deployedContract.deploymentTransaction();

  console.log(
    "StoreMyNumber deployed to:",
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
