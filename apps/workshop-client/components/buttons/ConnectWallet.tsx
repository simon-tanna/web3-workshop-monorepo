import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet, walletConnect } from "thirdweb/wallets";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID as string,
});

export const ConnectWallet = () => {
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
    createWallet("me.rainbow"),
    createWallet("app.phantom"),
  ];

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
