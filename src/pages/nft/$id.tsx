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
import { Helmet } from "react-helmet";
import { useEffect } from "react";

const NFTPage = () => {
  const { id } = useParams();
  const { contract } = useContract(contractAddress);
  const { data: nft, isLoading } = useNFT(contract, Number(id));
  const { data: contractMetadata } = useContractMetadata(contract);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-0 min-h-screen bg-[#0A0A0A] p-0 text-neutral-200">
      <Header />

      <Helmet>
        <title>{nft?.metadata.name}</title>
      </Helmet>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 md:flex-row">
        <div className="flex flex-col px-10 md:min-h-screen md:w-1/2">
          {nft ? (
            <ThirdwebNftMedia
              metadata={nft?.metadata}
              className="!md:h-96 !md:w-96 !h-full !max-h-[600px] !w-full !max-w-[600px] !rounded-lg !object-cover"
            />
          ) : (
            isLoading && (
              <div className="h-96 w-96 animate-pulse rounded-lg bg-gray-800" />
            )
          )}

          {nft?.metadata.description ? (
            <p className="text-xl font-semibold uppercase text-[#646D7A]">
              Description
            </p>
          ) : (
            isLoading && (
              <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            )
          )}

          {isLoading ? (
            <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
          ) : (
            <p className="text-xl">{nft?.metadata.description}</p>
          )}

          <div className="mt-8 flex flex-col gap-4">
            {isLoading ? (
              <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            ) : (
              <p className="text-xl font-semibold uppercase text-[#646D7A]">
                Attributes
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              {/* @ts-ignore */}
              {nft?.metadata.attributes?.map(
                (attr: { trait_type: string; value: string }) => (
                  <div className="flex flex-col rounded-lg border-2 border-gray-900 bg-black/50 p-4">
                    <h2 className="text-md text-gray-500">{attr.trait_type}</h2>
                    <h1 className="text-lg text-gray-200">{attr.value}</h1>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex w-full flex-col gap-6 px-10 md:mt-0 md:min-h-screen md:w-1/2">
          <div className="flex flex-col">
            {contractMetadata?.name ? (
              <p className="text-xl font-semibold uppercase text-[#646D7A]">
                collection
              </p>
            ) : (
              isLoading && (
                <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
              )
            )}

            {isLoading ? (
              <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            ) : (
              <p className="text-xl">{contractMetadata?.name}</p>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-xl font-semibold uppercase text-[#646D7A]">
              #{id}
            </p>

            {nft?.metadata.name ? (
              <p className="text-xl">
                {String(nft?.metadata.name).split("#")[0]}
              </p>
            ) : (
              isLoading && (
                <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
              )
            )}
          </div>

          <div className="flex flex-col">
            {nft?.owner ? (
              <p className="text-xl font-semibold uppercase text-[#646D7A]">
                CURRENT OWNER
              </p>
            ) : (
              isLoading && (
                <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
              )
            )}

            {isLoading ? (
              <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            ) : (
              <p className="text-xl">{truncateAddress(nft?.owner!)}</p>
            )}
          </div>

          <div className="mb-8 mt-auto md:mb-40 md:w-full">
            <PoweredBy />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
