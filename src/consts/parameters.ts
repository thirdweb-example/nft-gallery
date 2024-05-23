import { createThirdwebClient, getContract } from "thirdweb";
import { ethereum } from "thirdweb/chains";

/** Change these values to configure the application for your own use. **/

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_TEMPLATE_CLIENT_ID,
});

export const nftContract = getContract({
  // Your smart contract address (available on the thirdweb dashboard)
  address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  chain: ethereum,
  client,
});

// The block explorer you want to use (Opens when user clicks on history of events. i.e. transfers)
export const blockExplorer = "https://etherscan.io";
