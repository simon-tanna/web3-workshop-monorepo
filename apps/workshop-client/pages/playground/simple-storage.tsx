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
                User Name By Number
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
              <Button onClick={() => {}}>Get Number</Button>
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
              <Button onClick={() => {}}>Get Name By Index</Button>
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
              <Button onClick={() => {}}>Add Person</Button>
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
              <Button onClick={() => {}}>Set New Number</Button>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </PageStack>
  );
};

export default SimpleStorage;
