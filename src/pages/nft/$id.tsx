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

const DynamicDashboard = () => {
  const { id } = useParams();
  const { contract } = useContract(contractAddress);
  const { data: nft } = useNFT(contract, Number(id));
  const { data: contractMetadata } = useContractMetadata(contract);

  return (
    <div className="m-0 min-h-screen bg-[#0A0A0A] p-0 text-neutral-200">
      <Header />
      {nft && (
        <div className="mx-auto flex min-h-screen w-full px-4">
          <div className="flex min-h-screen w-1/2 flex-col px-10">
            {nft && (
              <ThirdwebNftMedia
                metadata={nft?.metadata}
                className="!h-96 !w-96 rounded-lg"
              />
            )}

            {nft?.metadata.description && (
              <p className="mt-8 text-xl font-semibold uppercase text-[#646D7A]">
                Description
              </p>
            )}

            <p className="mt-4 text-xl">{nft?.metadata.description}</p>

            <p className="mt-8 text-xl font-semibold uppercase text-[#646D7A]">
              Attributes
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              {/* @ts-ignore */}
              {nft.metadata.attributes?.map(
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
            {contractMetadata?.name && (
              <p className="mt-8 text-xl font-semibold uppercase text-[#646D7A]">
                collection
              </p>
            )}

            <p className="mt-4 text-xl">{contractMetadata?.name}</p>

            <p className="mt-8 text-xl font-semibold uppercase text-[#646D7A]">
              #{id}
            </p>
            {nft?.metadata.name && (
              <p className="mt-4 text-xl">
                {String(nft.metadata.name).split("#")[0]}
              </p>
            )}

            {nft?.owner && (
              <p className="mt-8 text-xl font-semibold uppercase text-[#646D7A]">
                CURRENT OWNER
              </p>
            )}

            <p className="mt-4 text-xl">{truncateAddress(nft?.owner!)}</p>

            <div className="mb-40 mt-auto">
              <PoweredBy />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicDashboard;
