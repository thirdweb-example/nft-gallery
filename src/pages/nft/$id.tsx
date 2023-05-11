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
    <div className="text-neutral-200 bg-[#0A0A0A] m-0 p-0 min-h-screen">
      <Header />
      {nft && (
        <div className="w-full flex mx-auto px-4 min-h-screen">
          <div className="w-1/2 flex flex-col px-10 min-h-screen">
            {nft && (
              <ThirdwebNftMedia
                metadata={nft?.metadata}
                className="!w-96 !h-96 rounded-lg"
              />
            )}

            {nft?.metadata.description && (
              <p className="text-xl font-semibold mt-8 text-[#646D7A] uppercase">
                Description
              </p>
            )}

            <p className="text-xl mt-4">{nft?.metadata.description}</p>

            <p className="text-xl font-semibold mt-8 text-[#646D7A] uppercase">
              Attributes
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              {/* @ts-ignore */}
              {nft.metadata.attributes?.map(
                (attr: { trait_type: string; value: string }) => (
                  <div className="flex flex-col rounded-lg p-4 bg-black/50 border-2 border-gray-900">
                    <h2 className="text-md text-gray-500">{attr.trait_type}</h2>
                    <h1 className="text-lg text-gray-200">{attr.value}</h1>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="w-1/2 flex flex-col px-10 min-h-screen">
            {contractMetadata?.name && (
              <p className="text-xl font-semibold mt-8 text-[#646D7A] uppercase">
                collection
              </p>
            )}

            <p className="text-xl mt-4">{contractMetadata?.name}</p>

            <p className="text-xl font-semibold mt-8 text-[#646D7A] uppercase">
              #{id}
            </p>
            {nft?.metadata.name && (
              <p className="text-xl mt-4">
                {String(nft.metadata.name).split("#")[0]}
              </p>
            )}

            {nft?.owner && (
              <p className="text-xl font-semibold mt-8 text-[#646D7A] uppercase">
                CURRENT OWNER
              </p>
            )}

            <p className="text-xl mt-4">{truncateAddress(nft?.owner!)}</p>

            <div className="mt-auto mb-40">
              <PoweredBy />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicDashboard;
