import { ethers } from "hardhat";

async function main() {
  // Load the compiled Factory contract artifacts
  const FactoryContract = await ethers.getContractFactory(
    "StoreMyNumberFactory"
  );

  console.log("Deploying StoreMyNumberFactory...");

  // Deploy the factory contract
  const deployment = await FactoryContract.deploy();
  const deployedContract = await deployment.waitForDeployment();
  const contractAddress = await deployedContract.getAddress();
  const contractTransaction = deployedContract.deploymentTransaction();

  console.log(
    "StoreMyNumberFactory deployed to:",
    contractAddress,
    "Transaction hash: ",
    contractTransaction?.hash
  );
}

// Execute the deploy script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
