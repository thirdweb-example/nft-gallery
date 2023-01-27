# NFT Gallery

This project demonstrates how you can create a gallery of your NFT Collection using thirdweb and Next.js.

We use an [NFT Drop](https://portal.thirdweb.com/pre-built-contracts/nft-drop) contract to to mint NFTs and display them in a gallery.

## Tools:

- [React SDK](https://docs.thirdweb.com/react): To access the connected wallet, switch the user's network, and claim an NFT from our Edition Drop collection.

## Using This Template

Create a project using this example:

```bash
npx thirdweb create --template nft-gallery
```

- Create an [NFT Drop](https://thirdweb.com/thirdweb.eth/DropERC721) contract using the dashboard.
- Update the contract address in [pages/index.tsx](./pages/index.tsx) file to use your contract address and auth domain name.

## How It Works

Using the `useNFTs` hook, we can fetch all of the NFTs in our collection and display them in a gallery.

```jsx
const { contract } = useContract(
  "0x05B8aab3fd77580C29c6510d8C54D9E6be4262d2",
  "nft-drop"
);

const { data: nfts, isLoading: loading } = useNFTs(contract, {
  start: 0,
  count: 10,
});
```

Then we filter out the NFTs and map through it to render the NFTs

```jsx
{
  nfts && nfts?.length > 0 && (
    <div className={styles.cards}>
      {nfts
        .filter(
          (nft) => nft.owner !== "0x0000000000000000000000000000000000000000"
        )
        .map((nft) => (
          <div key={nft.metadata.id.toString()} className={styles.card}>
            <h1>{nft.metadata.name}</h1>
            <ThirdwebNftMedia
              metadata={nft.metadata}
              className={styles.image}
            />
            <p>
              owned by{" "}
              {address && nft.owner === address
                ? "you"
                : truncateAddress(nft.owner)}
            </p>
          </div>
        ))}
    </div>
  );
}
```

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
