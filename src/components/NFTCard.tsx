import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

interface INFTCardProps {
  nft: NFT;
}

export const NFTCard: FC<INFTCardProps> = ({ nft }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Link to={`/nft/${nft.metadata.id}`}>
      <div
        className="flex flex-col items-center gap-4 justify-center mx-auto cursor-pointer hover:scale-105 transition-all duration-300 !w-60 z-10 bg-transparent"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <ThirdwebNftMedia
          metadata={nft.metadata}
          className="!w-60 !h-60 rounded-lg"
        />

        {hover && (
          <div className="absolute h-60 w-60 rounded-lg bg-black/50 backdrop-filter flex items-center justify-center flex-col">
            <h1 className="text-2xl text-gray-200">
              {String(nft.metadata.name).split(" ")[0]}
            </h1>
            <h1 className="text-2xl text-gray-200 font-bold">
              {String(nft.metadata.name).split(" ")[1]}
            </h1>
          </div>
        )}
      </div>
    </Link>
  );
};
