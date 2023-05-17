import { contractAddress } from "@/consts/parameters";
import {
  ConnectWallet,
  useContract,
  useContractMetadata,
  useNFT,
} from "@thirdweb-dev/react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { contract } = useContract(contractAddress);
  const { data: firstNFT, isLoading: nftLoading } = useNFT(contract, 0);
  const { data: contractMetadata, isLoading: contractLoading } =
    useContractMetadata(contract);

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
                src={contractMetadata?.image || firstNFT?.metadata.image}
                alt={contractMetadata?.name || firstNFT?.metadata.name}
              />
              <p className="text-2xl font-bold text-white">
                {contractMetadata?.name || firstNFT?.metadata.name}{" "}
              </p>
            </>
          )}
        </div>
      </Link>

      <div className="max-w-xs">
        <ConnectWallet theme="dark" />
      </div>
    </header>
  );
};
