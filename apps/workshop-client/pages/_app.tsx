import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";
import * as dotenv from "dotenv";
import ApplicationContainer from "@/components/ApplicationContainer";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const id = process.env.THIRD_WEB_CLIENT_ID;

  const client = createThirdwebClient({
    clientId: "d8c72bb562cde401bd32af77c6d12c93",
  });

  return (
    <ThirdwebProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <ApplicationContainer>
            <Component {...pageProps} />
          </ApplicationContainer>
        </ChakraProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}
