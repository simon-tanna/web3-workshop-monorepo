import { LinkCard } from "@/components/cards";
import { PageStack } from "@/styles";
import { Heading, Stack } from "@chakra-ui/react";
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
          imageUrl="https://www.treehugger.com/thmb/hJwbG6KQwjlerV9BEguus_FeOC0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3688693378_56c58b1f49_o-d5ef62c1cb6d4449b13a552aac845e1e.jpg"
          heading="Store My Number Factory"
          text="Deploy your own Store My Number contract"
          url="/contract-factory"
        />
      </Stack>
    </PageStack>
  );
};

export default Resources;
