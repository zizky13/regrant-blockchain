import { ethers } from "hardhat";

async function main() {
  console.log("Deploying TodoList contract...");
  
  const TodoList = await ethers.getContractFactory("TodoList");
  const todoList = await TodoList.deploy();

  console.log("Waiting for deployment transaction...");
  await todoList.waitForDeployment();
  
  const address = await todoList.getAddress();
  
  console.log(`TodoList deployed successfully to: ${address}`);
  console.log(`Verify contract with:`);
  console.log(`npx hardhat verify --network mantaPacificTestnet ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });