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
import { LinkIcon } from "@/icons/LinkIcon";

const NFTPage = () => {
  const { id } = useParams();
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
                <a
                  href={`${blockExplorer}/tx/${event.transaction.transactionHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-evenly gap-4 rounded-xl border-2 border-gray-800 p-4 md:flex-row"
                  key={event.transaction.transactionHash}
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-[#646D7A] ">
                      EVENT
                    </p>
                    <p className="text-md font-bold text-white">
                      {event.eventName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-semibold text-[#646D7A] ">
                        FROM
                      </p>
                      <p className="text-md font-bold text-[#646d7a]">
                        {truncateAddress(event.data.from)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-semibold text-[#646D7A] ">
                        TO
                      </p>
                      <p className="text-md font-bold text-[#646d7a]">
                        {truncateAddress(event.data.to)}
                      </p>
                    </div>
                  </div>

                  <LinkIcon />
                </a>
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
