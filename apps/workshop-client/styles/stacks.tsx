import { Stack, chakra } from "@chakra-ui/react";

export const PageStack = chakra(Stack, {
  baseStyle: {
    textAlign: "center",
    alignItems: "center",
    width: "100%",
    spacing: "20px",
    marginTop: "30px",
    height: "100%",
  },
});
