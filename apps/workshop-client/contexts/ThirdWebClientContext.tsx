import { createContext } from "react";
import { ThirdwebClient } from "thirdweb";

export interface ThirdWebClientContext {
  client: ThirdwebClient | undefined;
}

export const ThirdWebClientContext = createContext<ThirdWebClientContext>({
  client: undefined,
});
