import { STORE_MY_NUMBER_ADDRESS } from "@/constants";
import { STORE_MY_NUMBER_ABI } from "@/constants/abi";

import { ThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

export const getStoreMyNumberContract = (client?: ThirdwebClient) => {
  if (!client) {
    return;
  }
  const simpleStorageContract = getContract({
    client,
    chain: sepolia,
    address: STORE_MY_NUMBER_ADDRESS,
    abi: STORE_MY_NUMBER_ABI,
  });

  return simpleStorageContract;
};
