import { Aurora, Footer, Header, NFTCard } from "@/components";
import { contractAddress } from "@/details/contractAddress";
import {
  useContract,
  useContractMetadata,
  useNFT,
  useNFTs,
  useTotalCount,
} from "@thirdweb-dev/react";
import { useState } from "react";

function App() {
  const nftsPerPage = 30;
  const { contract } = useContract(contractAddress);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<number | null>(null);
  const { data: nfts, isLoading } = useNFTs(contract, {
    count: nftsPerPage,
    start: (page - 1) * nftsPerPage,
  });
  const { data: nft, isLoading: nftLoading } = useNFT(contract, search);
  const { data: totalCount } = useTotalCount(contract);
  const { data: contractMetadata } = useContractMetadata(contract);

  return (
    <div className="text-neutral-200 bg-[#0A0A0A] m-0 p-0">
      <Header />

      <div className="w-full flex flex-col mx-auto px-4 min-h-screen">
        {contractMetadata && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">{contractMetadata.name}</h1>
            <h2 className="text-xl font-bold">
              {contractMetadata.description}
            </h2>
          </div>
        )}

        <input
          type="text"
          onChange={(e) => setSearch(Number(e.target.value))}
          className="w-96 h-12 text-white px-4 focus:outline-none focus:ring-1 focus:ring-opacity-50 mx-auto mb-8 rounded-full bg-white/5 border text-xl focus:ring-purple-700 border-white/10"
          placeholder="Search by ID"
        />
        {search && nftLoading ? (
          <div className="!w-60 !h-60 rounded-lg bg-gray-800 animate-pulse" />
        ) : null}
        {search && nft ? <NFTCard nft={nft} key={nft.metadata.id} /> : null}

        {isLoading && (
          <div className="flex flex-wrap gap-8">
            {Array.from({ length: nftsPerPage }).map((_, i) => (
              <div className="!w-60 !h-60 rounded-lg bg-gray-800 animate-pulse" />
            ))}
          </div>
        )}
        <Aurora
          size={{ width: "1800px", height: "700px" }}
          pos={{ top: "80%", left: "50%" }}
          color="hsl(277deg 59% 39% / 10%)"
        />
        {nfts && !search && (
          <div className="flex flex-wrap gap-8">
            {nfts.map((nft) => (
              <NFTCard nft={nft} key={nft.metadata.id} />
            ))}
          </div>
        )}

        {!isLoading && !search && (
          <Footer
            page={page}
            setPage={setPage}
            nftsPerPage={nftsPerPage}
            totalCount={totalCount}
          />
        )}
      </div>
    </div>
  );
}

export default App;
