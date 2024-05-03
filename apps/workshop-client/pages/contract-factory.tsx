import { CONTRACT_FACTORY_ADDRESS } from "@/constants";
import { CONTRACT_FACTORY_ABI } from "@/constants/contract-factory-abi";
import {
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "@/components/buttons";
import {
  Text,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useClipboard,
  IconButton,
} from "@chakra-ui/react";
import { PageStack } from "@/styles";
import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useMutation } from "@tanstack/react-query";
import { CopyIcon } from "@chakra-ui/icons";

const removeTrailingZerosFromEVMAddress = (address: string) => {
  // Ensure the input has a '0x' prefix (add if needed)
  if (!address.startsWith("0x")) {
    address = "0x" + address;
  }

  // Remove leading zeros while preserving at least one '0'
  const trimmed = address.replace(/^0x(0+)/, "0x");

  return trimmed;
};

const ContractFactory = () => {
  const [favouriteNumber, setFavouriteNumber] = useState<string>("7");
  const [yourNewContractAddress, setYourNewContractAddress] = useState<
    string | null
  >(null);

  const account = useActiveAccount();

  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  const simpleStorageContract = getContract({
    client,
    chain: sepolia,
    address: CONTRACT_FACTORY_ADDRESS,
    abi: CONTRACT_FACTORY_ABI,
  });

  const createContractMutation = useMutation({
    mutationFn: async () => {
      const transaction = prepareContractCall({
        contract: simpleStorageContract,
        method: "deployStoreMyNumber",
        params: [BigInt(favouriteNumber)],
      });

      const receipt = await sendAndConfirmTransaction({
        transaction,
        account: account!,
      });

      setYourNewContractAddress(
        removeTrailingZerosFromEVMAddress(
          receipt.logs[0].topics[2] as `0x${string}`
        )
      );
      setValue(
        removeTrailingZerosFromEVMAddress(
          receipt.logs[0].topics[2] as `0x${string}`
        )
      );

      return receipt;
    },
  });

  return (
    <PageStack>
      <Heading>Contract Factory</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Choose your favourite number</FormLabel>
          <Input
            type="number"
            max={10}
            defaultValue={7}
            onChange={(e) => setFavouriteNumber(e.target.value)}
          />
        </FormControl>
        {!account?.address && (
          <Text color="red">Connect to a wallet to create a contract</Text>
        )}
        {createContractMutation.isError && (
          <Text color="red">
            Error creating contract: {createContractMutation.error.message}
          </Text>
        )}
        <Button
          isDisabled={!account}
          onClick={() => createContractMutation.mutate()}
          isLoading={createContractMutation.isPending}
        >
          Create Favourite Number Contract
        </Button>
        {yourNewContractAddress && (
          <>
            <Text>Your contract address:</Text>
            <Text>{yourNewContractAddress}</Text>
            <IconButton
              onClick={onCopy}
              aria-label="Copy"
              icon={<CopyIcon />}
            />
          </>
        )}
      </VStack>
    </PageStack>
  );
};

export default ContractFactory;
