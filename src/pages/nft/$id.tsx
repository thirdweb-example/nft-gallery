import { Header } from "@/components";
import { PoweredBy } from "@/components/PoweredBy";
import { contractAddress } from "@/details/contractAddress";
import { truncateAddress } from "@/utils/truncateAddress";
import {
  ThirdwebNftMedia,
  useContract,
  useContractMetadata,
  useNFT,
} from "@thirdweb-dev/react";
import { useParams } from "react-router-dom";

const NFTPage = () => {
  const { id } = useParams();
  const { contract } = useContract(contractAddress);
  const { data: nft, isLoading } = useNFT(contract, Number(id));
  const { data: contractMetadata } = useContractMetadata(contract);

  return (
    <div className="m-0 min-h-screen bg-[#0A0A0A] p-0 text-neutral-200">
      <Header />
      <div className="mx-auto flex min-h-screen w-full flex-col px-4 md:flex-row">
        <div className="flex min-h-screen flex-col px-10 md:w-1/2">
          {nft ? (
            <ThirdwebNftMedia
              metadata={nft?.metadata}
              className="!md:h-96 !md:w-96 !h-full !w-full !rounded-lg !object-contain"
            />
          ) : (
            isLoading && (
              <div className="h-96 w-96 animate-pulse rounded-lg bg-gray-800" />
            )
          )}

          {nft?.metadata.description ? (
            <p className="mt-8 text-xl font-semibold uppercase text-[#646D7A]">
              Description
            </p>
          ) : (
            isLoading && (
              <div className="mt-8 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            )
          )}

          {isLoading ? (
            <div className="mt-4 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
          ) : (
            <p className="mt-4 text-xl">{nft?.metadata.description}</p>
          )}

          {isLoading ? (
            <div className="mt-4 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
          ) : (
            <p className="mt-8 text-xl font-semibold uppercase text-[#646D7A]">
              Attributes
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-4">
            {/* @ts-ignore */}
            {nft?.metadata.attributes?.map(
              (attr: { trait_type: string; value: string }) => (
                <div className="flex flex-col rounded-lg border-2 border-gray-900 bg-black/50 p-4">
                  <h2 className="text-md text-gray-500">{attr.trait_type}</h2>
                  <h1 className="text-lg text-gray-200">{attr.value}</h1>
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex min-h-screen w-1/2 flex-col px-10">
          {contractMetadata?.name ? (
            <p className="mt-8 text-xl font-semibold uppercase text-[#646D7A]">
              collection
            </p>
          ) : (
            isLoading && (
              <div className="mt-8 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            )
          )}

          {isLoading ? (
            <div className="mt-4 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
          ) : (
            <p className="mt-4 text-xl">{contractMetadata?.name}</p>
          )}

          <p className="mt-8 text-xl font-semibold uppercase text-[#646D7A]">
            #{id}
          </p>

          {nft?.metadata.name ? (
            <p className="mt-4 text-xl">
              {String(nft?.metadata.name).split("#")[0]}
            </p>
          ) : (
            isLoading && (
              <div className="mt-4 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            )
          )}

          {nft?.owner ? (
            <p className="mt-8 text-xl font-semibold uppercase text-[#646D7A]">
              CURRENT OWNER
            </p>
          ) : (
            isLoading && (
              <div className="mt-8 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            )
          )}

          {isLoading ? (
            <div className="mt-4 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
          ) : (
            <p className="mt-4 text-xl">{truncateAddress(nft?.owner!)}</p>
          )}

          <div className="mb-40 mt-auto w-full">
            <PoweredBy />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
