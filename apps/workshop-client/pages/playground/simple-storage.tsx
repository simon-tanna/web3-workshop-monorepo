import { client } from "@/components/buttons";
import { getStoreMyNumberContract } from "@/helpers";

import { PageStack } from "@/styles";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { prepareContractCall, readContract, sendTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";

/**
 * The SimpleStorage component demonstrates interactions with a basic
 * "store a number" style smart contract.
 *
 * Key Features:
 * - Reads and displays the current stored number from the contract.
 * - Provides forms for:
 *   - Retrieving a user's favorite number by their name.
 *   - Retrieving a user's name and favorite number by index.
 *   - Adding a new user and their favorite number.
 *   - Updating the stored number in the contract.
 *
 * @returns A JSX component rendering the storage interaction interface.
 */
const SimpleStorage: NextPage = () => {
  const [storedNumber, setStoredNumber] = useState<string | null>(null);
  const [userNumber, setUserNumber] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userByIndex, setUserByIndex] = useState<{
    userName: string;
    favouriteNumber: string;
  }>();
  const [newNumber, setNewNumber] = useState<string | null>(null);
  const [newName, setNewName] = useState<string | null>(null);
  const [index, setIndex] = useState<string>("0");

  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const account = useActiveAccount();

  const simpleStorageContract = getStoreMyNumberContract(client);

  /**
   * Fetches the current stored number from the SimpleStorage contract.
   *
   * @returns A string representation of the stored number.
   */
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

  /**
   * Retrieves a user's favorite number by their name from the SimpleStorage contract.
   *
   * @param name - The name of the user.
   * @returns A string representation of the user's favorite number.
   */
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

  /**
   * Retrieves a user's name and favorite number by their index from the SimpleStorage contract.
   *
   * @param index - The index of the user (as a string).
   * @returns An object containing:
   *   - userName: The user's name.
   *   - favouriteNumber: The user's favorite number (as a string).
   */
  const getPersonByIndex = async (index: string) => {
    if (!simpleStorageContract) {
      return;
    }
    const result = await readContract({
      contract: simpleStorageContract,
      method: "people",
      params: [BigInt(index)],
    });

    setUserByIndex((prevState) => ({
      ...prevState,
      userName: result[1],
      favouriteNumber: result[0].toString(),
    }));
    return { userName: result[1], favouriteNumber: result[0].toString() };
  };

  /**
   * Adds a new user and their favorite number to the SimpleStorage contract.
   *
   * @param name - The user's name.
   * @param favouriteNumber - The user's favorite number (as a string).
   * @throws An error if the contract or active account is not found, or the transaction preparation fails.
   */
  const addPersonAndNumber = async ({
    name,
    favouriteNumber,
  }: {
    name: string;
    favouriteNumber: string;
  }) => {
    if (!simpleStorageContract) {
      throw new Error("Contract not found");
    }
    const preparedTransaction = prepareContractCall({
      contract: simpleStorageContract,
      method: "addPerson",
      params: [name, BigInt(favouriteNumber)],
    });

    if (!preparedTransaction) {
      throw new Error("Transaction not prepared");
    }
    if (!account) {
      throw new Error("Account not found");
    }

    const transactionResult = await sendTransaction({
      transaction: preparedTransaction,
      account: account,
    });

    setTransactionHash(transactionResult.transactionHash);
  };

  const addPersonAndNumberMutation = useMutation({
    mutationFn: addPersonAndNumber,
  });

  const onAddPersonAndNumberSubmit = () => {
    addPersonAndNumberMutation.mutate({
      name: newName ?? "",
      favouriteNumber: newNumber ?? "",
    });
  };

  /**
   * Updates the stored number in the SimpleStorage contract.
   *
   * @param newNumber - The new number to store (as a string).
   * @throws An error if the contract or active account is not found, or the transaction preparation fails.
   */
  const changeStoredNumber = async (newNumber: string) => {
    if (!simpleStorageContract) {
      throw new Error("Contract not found");
    }
    const preparedTransaction = prepareContractCall({
      contract: simpleStorageContract,
      method: "store",
      params: [BigInt(newNumber)],
    });

    if (!preparedTransaction) {
      throw new Error("Transaction not prepared");
    }
    if (!account) {
      throw new Error("Account not found");
    }

    const transactionResult = await sendTransaction({
      transaction: preparedTransaction,
      account: account,
    });

    setTransactionHash(transactionResult.transactionHash);
  };

  const changeStoredNumberMutation = useMutation({
    mutationFn: changeStoredNumber,
  });

  const onChangeStoredNumberSubmit = () => {
    changeStoredNumberMutation.mutate(newNumber ?? "7");
  };

  return (
    <PageStack>
      <Heading>Simple Storage</Heading>
      <Text>Contract State</Text>
      <Heading size="md">Current Stored Number</Heading>
      <Text>{storedNumber}</Text>
      <Accordion allowToggle w={["100%", "100%", "80%", "50%"]}>
        <AccordionItem>
          <h2>
            <AccordionButton w="100%" justifyContent="space-between">
              <Box as="span" textAlign="left">
                Number By User Name
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack spacing={6}>
              <FormControl maxW="100%">
                <FormLabel>Enter User Name</FormLabel>
                <Input
                  placeholder="Name"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormControl>
              <Button
                onClick={async () => await getNumberByName(userName ?? "")}
              >
                Get Number
              </Button>
              <Heading size="sm">User Number</Heading>
              <Text>{userNumber}</Text>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton w="100%" justifyContent="space-between">
              <Box as="span" textAlign="left">
                User By Index
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack spacing={6}>
              {" "}
              <FormControl maxW="100%">
                <FormLabel>Enter Index</FormLabel>
                <Input
                  placeholder="Index"
                  onChange={(e) => setIndex(e.target.value)}
                />
              </FormControl>
              <Button onClick={async () => await getPersonByIndex(index)}>
                Get Name By Index
              </Button>
              <Heading size="md">User Name in index {index}</Heading>
              <Text>{userByIndex?.userName}</Text>
              <Heading size="md">Favourite Number in index {index}</Heading>
              <Text>{userByIndex?.favouriteNumber}</Text>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton w="100%" justifyContent="space-between">
              <Box as="span" textAlign="left">
                Add Person And Number
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack>
              <FormControl maxW="50%">
                <FormLabel>Enter New User Name</FormLabel>
                <Input
                  placeholder="Name"
                  onChange={(e) => setNewName(e.target.value)}
                />
              </FormControl>
              <FormControl maxW="50%">
                <FormLabel>Enter New Number</FormLabel>
                <Input
                  placeholder="Number"
                  onChange={(e) => setNewNumber(e.target.value)}
                />
              </FormControl>
              <Button onClick={onAddPersonAndNumberSubmit}>Add Person</Button>
              {transactionHash && (
                <>
                  <Heading size="sm">Transaction Hash</Heading>
                  <Text>{transactionHash}</Text>
                  <Link
                    href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                    isExternal
                  >
                    View on block explorer
                  </Link>
                </>
              )}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton w="100%" justifyContent="space-between">
              <Box as="span" textAlign="left">
                Update Stored Number
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack spacing={6}>
              {" "}
              <FormControl maxW="100%">
                <FormLabel>New Number</FormLabel>
                <Input
                  placeholder="Index"
                  onChange={(e) => setNewNumber(e.target.value)}
                />
              </FormControl>
              <Button onClick={onChangeStoredNumberSubmit}>
                Set New Number
              </Button>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {addPersonAndNumberMutation.isError && (
        <Text color="red.500">{addPersonAndNumberMutation.error.message}</Text>
      )}
      {changeStoredNumberMutation.isError && (
        <Text color="red.500">{changeStoredNumberMutation.error.message}</Text>
      )}
    </PageStack>
  );
};

export default SimpleStorage;
