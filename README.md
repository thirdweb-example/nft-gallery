# NFT Gallery

Create your own NFT gallery for any ERC721/ERC1155 NFT collection on [any EVM-compatible chain](https://blog.thirdweb.com/any-contract-any-evm-chain/).

View the metadata of all NFTs in the collection, including features such as pagination, filtering, and search.

## Using This Repo

To create your own version of this template, you can use the following steps:

Run this command from the terminal to clone this project:

```bash
npx thirdweb create --template nft-gallery
```

## Environment Variables

To run this project, you will need to add environment variables. Check the `.env.example` file for all the environment variables required and add it to `.env` file or set them up on your hosting provider.

### 1. Deploy or Import Your NFT Collection

If you haven't already deployed your contract, head over to the thirdweb dashboard and create your own [NFT collection](https://thirdweb.com/thirdweb.eth/TokenERC721) contract.

If you have an existing contract, use the [thirdweb dashboard](https://thirdweb.com/dashboard) to import it!

### 2. Configure Parameters

Go to the [`parameters.ts`](/src/consts/parameters.ts) and update the following values:

1. `contractAddress`: The smart contract address of your NFT collection.
2. `chain`: The name of the chain that your smart contract is deployed to.
3. `blockExplorer`: (Optional) - The block explorer to open when user's click on historical events of each NFT.

### 3. Customize the Styling

Update the styles in the respective components by changing the [Tailwind](https://tailwindcss.com/) classes.

## Join our Discord!

For any questions or suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
