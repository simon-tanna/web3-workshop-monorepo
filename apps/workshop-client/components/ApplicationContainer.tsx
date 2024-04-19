import { chakra, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

import Sidebar from "./Sidebar";

const ApplicationContainer = ({ children }: { children: ReactNode }) => (
  <ApplicationWrapper>
    <Sidebar />
    {/* <MainContainer> */}
    {children}
    {/* </MainContainer> */}
  </ApplicationWrapper>
);

export default ApplicationContainer;

const ApplicationWrapper = chakra(Flex, {
  baseStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    minHeight: "100vh",
    width: "100vw",
    overflowX: "clip",
  },
});
