import { ThirdWebClientContext } from "@/contexts/ThirdWebClientContext";
import { useContext } from "react";
import { ConnectButton } from "thirdweb/react";
import { createWallet, walletConnect } from "thirdweb/wallets";

export const ConnectWallet = () => {
  const { client } = useContext(ThirdWebClientContext);

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
    createWallet("me.rainbow"),
    createWallet("app.phantom"),
  ];

  if (client)
    return (
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={"light"}
        connectButton={{ label: "Connect" }}
        connectModal={{
          size: "wide",
          welcomeScreen: {
            title: "Welcome to the web3 ecosystem",
            subtitle: "Get ready to shape the new world!",
          },
        }}
      />
    );
};
