import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";
import * as dotenv from "dotenv";
import ApplicationContainer from "@/components/ApplicationContainer";

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();
  const id = process.env.THIRD_WEB_CLIENT_ID;

  return (
    <ThirdwebProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <ApplicationContainer>
            <Component {...pageProps} />
          </ApplicationContainer>
        </ChakraProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
};

export default App;
