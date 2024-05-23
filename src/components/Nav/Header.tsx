import { client, nftContract } from "@/consts/parameters";
import { Link } from "react-router-dom";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFT } from "thirdweb/extensions/erc721";
import { ConnectButton, useReadContract } from "thirdweb/react";

export const Header: React.FC = () => {
  const { data: firstNFT, isLoading: nftLoading } = useReadContract(getNFT, {
    contract: nftContract,
    tokenId: 1n,
  });
  const { data: contractMetadata, isLoading: contractLoading } =
    useReadContract(getContractMetadata, {
      contract: nftContract,
    });
  return (
    <header className="mx-auto mb-12 flex w-full max-w-7xl items-center justify-between p-4">
      <Link to="/">
        <div className="flex items-center space-x-4">
          {contractLoading ? (
            <>
              <div className="h-14 w-14 animate-pulse rounded-full bg-gray-800" />
              <div className="h-4 w-40 animate-pulse rounded-md bg-gray-800" />
            </>
          ) : (
            <>
              <img
                className="h-10 w-10 rounded-full object-contain"
                src={contractMetadata?.image || firstNFT?.metadata.image || ""}
                alt={
                  String(contractMetadata?.name) ||
                  String(firstNFT?.metadata.name) ||
                  ""
                }
              />
              <p className="text-2xl font-bold text-white">
                {contractMetadata?.name || firstNFT?.metadata.name}{" "}
              </p>
            </>
          )}
        </div>
      </Link>

      <div className="max-w-xs">
        <ConnectButton client={client} theme="dark" />
      </div>
    </header>
  );
};
