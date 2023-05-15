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
        className="z-10 mx-auto flex !w-60 cursor-pointer flex-col items-center justify-center gap-4 bg-transparent transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <ThirdwebNftMedia
          metadata={nft.metadata}
          className="!md:h-60 !md:w-60 !h-full !w-full rounded-lg"
        />

        {hover && (
          <div className="absolute flex h-60 w-60 flex-col items-center justify-center rounded-lg bg-black/50 backdrop-filter">
            <h1 className="text-2xl text-gray-200">
              {String(nft.metadata.name).split(" ")[0]}
            </h1>
            <h1 className="text-2xl font-bold text-gray-200">
              {String(nft.metadata.name).split(" ")[1]}
            </h1>
          </div>
        )}
      </div>
    </Link>
  );
};
