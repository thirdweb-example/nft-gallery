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
  const { data: contractMetadata, isLoading: contractLoading } =
    useContractMetadata(contract);

  return (
    <div className="m-0 bg-[#0A0A0A] p-0 text-neutral-200">
      <Header />

      <div className="z-20 mx-auto flex min-h-screen w-full flex-col px-4">
        {contractMetadata ? (
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white">
              {contractMetadata.name}
            </h1>
            <h2 className="text-xl font-bold text-white">
              {contractMetadata.description}
            </h2>
          </div>
        ) : contractLoading ? (
          <div className="mx-auto mb-8 text-center">
            <div className="mx-auto h-8 w-96 animate-pulse rounded-lg bg-gray-800" />
            <div className="mx-auto mt-4 h-8 w-96 animate-pulse rounded-lg bg-gray-800" />
          </div>
        ) : null}

        <input
          type="text"
          onChange={(e) => setSearch(Number(e.target.value))}
          className="mx-auto mb-8 h-12 w-96 max-w-full rounded-full border border-white/10 bg-white/5 px-4 text-xl text-white focus:outline-none focus:ring-1 focus:ring-purple-700 focus:ring-opacity-50"
          placeholder="Search by ID"
        />
        {search && nftLoading ? (
          <div className="!h-60 !w-60 animate-pulse rounded-lg bg-gray-800" />
        ) : null}

        {search && nft ? <NFTCard nft={nft} key={nft.metadata.id} /> : null}

        {isLoading && (
          <div className="flex flex-wrap gap-8">
            {Array.from({ length: nftsPerPage }).map((_, i) => (
              <div className="!h-60 !w-60 animate-pulse rounded-lg bg-gray-800" />
            ))}
          </div>
        )}
        <Aurora
          size={{ width: "1800px", height: "700px" }}
          pos={{ top: "80%", left: "50%" }}
          color="hsl(277deg 59% 39% / 10%)"
        />
        {nfts && !search && (
          <div className="flex flex-wrap items-center justify-center gap-8">
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
