import { LinkCard } from "@/components/cards";
import { PageStack } from "@/styles";
import {  Heading, Stack } from "@chakra-ui/react";
import { NextPage } from "next";

const Resources: NextPage = () => {
  return (
    <PageStack>
      <Heading>Resources</Heading>
      <Stack
        direction="row"
        spacing={4}
        maxW="100%"
        wrap="wrap"
        h="100%"
        alignItems="center"
        padding="20px"
        justifyContent="center"
      >
        <LinkCard
          imageUrl="https://www.alchemy.com/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F105223%2F1705014085-product-test.png&w=3840&q=75"
          heading="Sepolia Faucet"
          text="Get your test sepolia eth here"
          url="https://www.alchemy.com/faucets/ethereum-sepolia"
        />
        <LinkCard
          imageUrl="https://remix.ethereum.org/assets/img/guitarRemiCroped.webp"
          heading="Remix IDE"
          text="Build, test, and deploy smart contracts"
          url="https://remix.ethereum.org/"
        />
        <LinkCard
          imageUrl="https://assets-global.website-files.com/5ebbbacd07f0f10257ac30d9/65a14d9531b33cf5673fd697_NUM_LEVELS_HEADER2.jpg"
          heading="Store My Number Contract"
          text="A simple contract to store a number"
          url="https://github.com/simon-tanna/web3-workshop-monorepo/blob/main/packages/contracts/contracts/StoreMyNumber.sol"
        />
        <LinkCard
          imageUrl="https://i.ebayimg.com/images/g/gioAAOSwkF5jkqbo/s-l1200.webp"
          heading="ERC20 Token Faucet Contract"
          text="A simple contract to mint ERC20 tokens"
          url="https://github.com/simon-tanna/web3-workshop-monorepo/blob/main/packages/contracts/contracts/WorkshopToken.sol"
        />
      </Stack>
    </PageStack>
  );
};

export default Resources;
