import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ThirdwebClient, createThirdwebClient } from "thirdweb";
import { ThirdWebClientContext } from "./ThirdWebClientContext";

export interface ThirdWebClientProviderProps {
  children: ReactNode;
}

export const ThirdWebClientProvider = ({
  children,
}: ThirdWebClientProviderProps) => {
  const [thirdwebClient, setThirdwebClient] = useState<ThirdwebClient>();

  useEffect(() => {
    if (thirdwebClient) {
      return;
    }
    const client = createThirdwebClient({
      clientId: process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID as string,
    });
    setThirdwebClient(client);
  }, [thirdwebClient]);

  const values: ThirdWebClientContext = useMemo(() => {
    return { client: thirdwebClient };
  }, [thirdwebClient]);

  return (
    <ThirdWebClientContext.Provider value={values}>
      {children}
    </ThirdWebClientContext.Provider>
  );
};
