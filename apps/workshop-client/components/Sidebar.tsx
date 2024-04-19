import { Flex, Stack, Text } from "@chakra-ui/react";
import { FiBarChart2, FiHome, FiClipboard } from "react-icons/fi";
import { GiTap } from "react-icons/gi";
import { ConnectWallet, NavButton } from "./buttons";

const Sidebar = () => (
  <Flex as="section" minH="100vh" bg="blue.900">
    <Flex
      flex="1"
      bg="bg.surface"
      boxShadow="sm"
      maxW={{ base: "full", sm: "xs" }}
      py={{ base: "6", sm: "8" }}
      px={{ base: "4", sm: "6" }}
    >
      <Stack justify="space-between" spacing="1" width="full">
        <Stack spacing="8" shouldWrapChildren>
          <ConnectWallet />
          <Stack spacing="1">
            <NavButton label="Home" icon={FiHome} url="/" />
            <NavButton
              label="Resources"
              icon={FiBarChart2}
              aria-current="page"
              url="/resources"
            />
          </Stack>
          <Stack>
            <Text textStyle="sm" color="fg.subtle" fontWeight="medium">
              Sandbox Playground
            </Text>
            <Stack spacing="1">
              <NavButton
                label="Simple Storage"
                icon={FiClipboard}
                url="/playground/simple-storage"
              />
              <NavButton
                label="ERC20 Faucet"
                icon={GiTap}
                url="/playground/erc20"
              />
              <NavButton
                label="ERC721"
                icon={FiClipboard}
                url="/playground/erc721"
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  </Flex>
);

export default Sidebar;
