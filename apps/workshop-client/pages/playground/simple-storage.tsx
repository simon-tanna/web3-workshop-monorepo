import { STORE_MY_NUMBER_ADDRESS } from "@/constants";
import { STORE_MY_NUMBER_ABI } from "@/constants/abi";
import { ThirdWebClientContext } from "@/contexts/ThirdWebClientContext";
import { getSimpleStorageContract } from "@/helpers";
import { PageStack } from "@/styles";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useCallback, useContext, useEffect, useState } from "react";
import { readContract } from "thirdweb";

const SimpleStorage: NextPage = () => {
  const { client } = useContext(ThirdWebClientContext);
  const [storedNumber, setStoredNumber] = useState<string | null>(null);
  const [userNumber, setUserNumber] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userByIndex, setUserByIndex] = useState<{
    userName: string;
    favouriteNumber: string;
  }>();

  const simpleStorageContract = getSimpleStorageContract(client);

  console.log(simpleStorageContract);

  const getStoredNumber = useCallback(async () => {
    if (!simpleStorageContract) {
      return;
    }
    const storedNumber = await readContract({
      contract: simpleStorageContract,
      method: "retrieve",
    });

    return storedNumber.toString();
  }, [simpleStorageContract]);

  useEffect(() => {
    const fetchStoredNumber = async () => {
      const storedNumberResult = await getStoredNumber();
      if (!storedNumberResult) {
        return;
      }
      setStoredNumber(storedNumberResult);
    };
    fetchStoredNumber();
  }, [getStoredNumber]);

  const getNumberByName = async (name: string) => {
    if (!simpleStorageContract) {
      return;
    }
    const result = await readContract({
      contract: simpleStorageContract,
      method: "retrievePeopleByName",
      params: [name],
    });

    setUserNumber(result.toString());
    return result.toString();
  };

  const getPersonByIndex = async () => {
    if (!simpleStorageContract) {
      return;
    }
    const result = await readContract({
      contract: simpleStorageContract,
      method: "people",
      params: [BigInt(0)],
    });

    setUserByIndex({
      userName: result[1],
      favouriteNumber: result[0].toString(),
    });
  };

  return (
    <PageStack>
      <Heading>Simple Storage</Heading>
      <Text>Contract State</Text>
      <Heading size="md">Stored Number</Heading>
      <Text>{storedNumber}</Text>
      <FormControl maxW="50%">
        <FormLabel>Enter User Name</FormLabel>
        <Input
          placeholder="Name"
          onChange={(e) => setUserName(e.target.value)}
        />
      </FormControl>{" "}
      <Button onClick={async () => await getNumberByName(userName ?? "")}>
        Get Number
      </Button>
      <Heading size="md">User Number</Heading>
      <Text>{userNumber}</Text>
      <Button onClick={async () => await getPersonByIndex()}>Get Name</Button>
      <Heading size="md">User Name in index 0</Heading>
      <Text>{userByIndex?.userName}</Text>
      <Heading size="md">Favourite Number in index 0</Heading>
      <Text>{userByIndex?.favouriteNumber}</Text>
    </PageStack>
  );
};

export default SimpleStorage;
