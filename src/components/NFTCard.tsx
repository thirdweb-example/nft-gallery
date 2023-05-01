import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import type { FC } from "react";

interface INFTCardProps {
  nft: NFT;
  setSelectedNft: (nft: NFT) => void;
}

export const NFTCard: FC<INFTCardProps> = ({ nft, setSelectedNft }) => {
  return (
    <div
      className="flex flex-col items-center gap-4 justify-center mx-auto cursor-pointer hover:scale-105 transition-all duration-300 !w-60 z-10 bg-transparent"
      onClick={() => setSelectedNft(nft)}
    >
      <ThirdwebNftMedia
        metadata={nft.metadata}
        className="!w-60 !h-60 rounded-lg"
      />

      <div className="flex flex-col items-center">
        <h1 className="text-lg text-gray-500">
          {String(nft.metadata.name).split(" ")[0]}
        </h1>
        <h2 className="text-lg text-gray-200">
          NO. {String(nft.metadata.name).split(" ")[1]}
        </h2>
      </div>
    </div>
  );
};
