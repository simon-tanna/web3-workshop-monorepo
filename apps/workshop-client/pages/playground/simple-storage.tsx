import { STORE_MY_NUMBER_ADDRESS } from "@/constants";
import { STORE_MY_NUMBER_ABI } from "@/constants/abi";
import { ThirdWebClientContext } from "@/contexts/ThirdWebClientContext";
import { getSimpleStorageContract } from "@/helpers";
import { PageStack } from "@/styles";
import { Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useCallback, useContext, useEffect, useState } from "react";
import { ContractOptions, getContract, readContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";

const SimpleStorage: NextPage = () => {
  const { client } = useContext(ThirdWebClientContext);

  const simpleStorageContract = getSimpleStorageContract(client);

  console.log(simpleStorageContract);

  const getStoredNumber = useCallback(async () => {
    if (!simpleStorageContract) {
      return;
    }
    const storedNumber = await readContract({
      contract: simpleStorageContract!,
      method: "retrieve",
    });

    console.log(storedNumber);
    return storedNumber.toString();
  }, [simpleStorageContract]);

  useEffect(() => {
    getStoredNumber();
  }, [getStoredNumber]);

  return (
    <PageStack>
      <Heading>Simple Storage</Heading>
      <Text>Contract State</Text>
    </PageStack>
  );
};

export default SimpleStorage;
