import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";
import * as dotenv from "dotenv";
import ApplicationContainer from "@/components/ApplicationContainer";
import { chillax } from "@/styles/fonts";
import { theme } from "@/styles/theme";

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <ThirdwebProvider>
      <QueryClientProvider client={queryClient}>
        <style jsx global>
          {`
            :root {
              --font-chillax: ${chillax.style.fontFamily};
            }
          `}
        </style>
        <ChakraProvider theme={theme}>
          <ApplicationContainer>
            <Component {...pageProps} />
          </ApplicationContainer>
        </ChakraProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
};

export default App;
