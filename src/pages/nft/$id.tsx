import { Header } from "@/components";
import { PoweredBy } from "@/components/PoweredBy";
import { blockExplorer, contractAddress } from "@/consts/parameters";
import { truncateAddress } from "@/utils/truncateAddress";
import {
  ThirdwebNftMedia,
  useContract,
  useContractEvents,
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
  const {
    data: eventsData,
    isLoading: eventsLoading,
    error,
  } = useContractEvents(contract, "Transfer", {
    queryFilter: {
      filters: {
        tokenId: Number(id!),
      },
      order: "asc", // Order of events ("asc" or "desc")
    },
  });

  console.log("data", eventsData);

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

          <div className="mt-8 flex flex-col gap-4">
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
          </div>

          {eventsData && eventsData?.length > 0 ? (
            <p className="mt-8 text-lg font-semibold uppercase text-[#646D7A]">
              History
            </p>
          ) : (
            isLoading && (
              <div className="mt-8 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            )
          )}

          {eventsLoading ? (
            <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
          ) : (
            <div className="mt-4 flex flex-col gap-4">
              {eventsData?.map((event) => (
                <div
                  className="flex items-center justify-evenly gap-4 rounded-xl border-2 border-gray-800 p-4"
                  key={event.transaction.transactionHash}
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-md text-gray-500">EVENT</p>
                    <p className="text-md text-gray-500">{event.eventName}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-md text-gray-500">FROM</p>
                    <p className="text-md text-gray-500">
                      {truncateAddress(event.data.from)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-md text-gray-500">TO</p>
                    <p className="text-md text-gray-500">
                      {truncateAddress(event.data.to)}
                    </p>
                  </div>

                  <a
                    href={`${blockExplorer}/tx/${event.transaction.transactionHash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                        stroke="#5A616D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 3H21V9"
                        stroke="#5A616D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 14L21 3"
                        stroke="#5A616D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </div>
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

          <div className="mb-8 mt-auto md:mb-40 md:w-full">
            <PoweredBy />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
