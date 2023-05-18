import { Header } from "@/components";
import { HistoryCard } from "@/components/HistoryCard";
import { PoweredBy } from "@/components/PoweredBy";
import { contractConst } from "@/consts/parameters";
import { truncateAddress } from "@/utils/truncateAddress";
import {
  ThirdwebNftMedia,
  useContract,
  useContractEvents,
  useContractMetadata,
  useNFT,
} from "@thirdweb-dev/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const NFTPage = () => {
  const { id } = useParams();
  const urlParams = new URL(window.location.toString()).searchParams;
  const contractAddress = urlParams.get("contract") || contractConst || "";
  const { contract } = useContract(contractAddress);
  const { data: nft, isLoading } = useNFT(contract, Number(id));
  const { data: contractMetadata } = useContractMetadata(contract);
  const { data: eventsData, isLoading: eventsLoading } = useContractEvents(
    contract,
    "Transfer",
    {
      queryFilter: {
        filters: {
          tokenId: Number(id!),
        },
        order: "desc",
      },
    },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-0 min-h-screen bg-[#0A0A0A] p-0 font-inter text-neutral-200">
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
              <div className="h-full max-h-[600px] w-full !max-w-[600px] animate-pulse rounded-lg bg-gray-800 md:h-96 md:w-96" />
            )
          )}

          {eventsData && eventsData?.length > 0 ? (
            <p className="mt-8 hidden text-lg font-semibold uppercase text-[#646D7A] md:flex">
              History
            </p>
          ) : (
            isLoading && (
              <div className="mt-8 hidden h-8 w-1/2 animate-pulse rounded-lg bg-gray-800 md:flex" />
            )
          )}

          {eventsLoading ? (
            <div className="mt-2 hidden h-8 w-1/2 animate-pulse rounded-lg bg-gray-800 md:flex" />
          ) : (
            <div className="mt-4 hidden flex-col gap-4 md:flex">
              {eventsData?.map((event) => (
                <HistoryCard event={event} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex w-full flex-col gap-6 px-10 md:mt-0 md:min-h-screen md:w-1/2">
          <div className="flex flex-col">
            {contractMetadata?.name ? (
              <p className="text-lg font-semibold uppercase text-[#646D7A]">
                collection
              </p>
            ) : (
              isLoading && (
                <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
              )
            )}

            {isLoading ? (
              <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            ) : (
              <p className="text-3xl font-bold text-white">
                {contractMetadata?.name}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-lg font-semibold uppercase text-[#646D7A]">
              #{id}
            </p>

            {nft?.metadata.name ? (
              <p className="text-3xl font-bold text-white">
                {String(nft?.metadata.name).split("#")[0]}
              </p>
            ) : (
              isLoading && (
                <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
              )
            )}
          </div>

          <div className="flex flex-col">
            {nft?.owner ? (
              <p className="text-lg font-semibold uppercase text-[#646D7A]">
                CURRENT OWNER
              </p>
            ) : (
              isLoading && (
                <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
              )
            )}

            {isLoading ? (
              <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            ) : (
              <p className="text-3xl font-bold text-white">
                {truncateAddress(nft?.owner!)}
              </p>
            )}
          </div>

          {nft?.metadata.description ? (
            <p className="text-lg font-semibold uppercase text-[#646D7A]">
              Description
            </p>
          ) : (
            isLoading && (
              <div className="mt-8 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            )
          )}

          {isLoading ? (
            <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
          ) : (
            <p className="text-lg font-medium text-white">
              {nft?.metadata.description}
            </p>
          )}

          <div className="-mt-4 flex flex-col gap-4">
            {nft?.metadata.attributes &&
              // @ts-ignore
              nft?.metadata.attributes.length > 0 && (
                <>
                  {isLoading ? (
                    <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
                  ) : (
                    <p className="text-lg font-semibold uppercase text-[#646D7A]">
                      Attributes
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4">
                    {/* @ts-ignore */}
                    {nft?.metadata.attributes?.map(
                      (attr: { trait_type: string; value: string }) => (
                        <div className="flex flex-col rounded-lg border border-gray-700 p-4">
                          <h2 className="text-sm font-semibold text-[#646D7A]">
                            {attr.trait_type}
                          </h2>
                          <h1 className="text-xl font-semibold text-gray-200">
                            {attr.value}
                          </h1>
                        </div>
                      ),
                    )}
                  </div>
                </>
              )}

            {eventsData && eventsData?.length > 0 ? (
              <p className="mt-8 flex text-lg font-semibold uppercase text-[#646D7A] md:hidden">
                History
              </p>
            ) : (
              isLoading && (
                <div className="mt-8 flex h-8 w-1/2 animate-pulse rounded-lg bg-gray-800 md:hidden" />
              )
            )}

            {eventsLoading ? (
              <div className="mt-2 flex h-8 w-1/2 animate-pulse rounded-lg bg-gray-800 md:hidden" />
            ) : (
              <div className="mt-4  flex flex-col gap-4 md:hidden">
                {eventsData?.map((event) => (
                  <HistoryCard event={event} />
                ))}
              </div>
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
