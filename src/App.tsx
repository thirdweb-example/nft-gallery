import {
  useContract,
  useNFTs,
  useNFT,
  useTotalCount,
} from "@thirdweb-dev/react";
import { useState } from "react";
import { Header, NFTCard, NFTModal, Skeleton } from "./components";
import { Aurora } from "./components/Aurora";
import { PaginationHelper } from "./components/PaginationHelper";

function App() {
  const nftsPerPage = 1000;
  const { contract } = useContract(
    "0xed5af388653567af2f388e6224dc7c4b3241c544"
  );
  const [page, setPage] = useState(1);
  const [selectedNft, setSelectedNft] = useState<any>(null);
  const [search, setSearch] = useState<number | null>(null);
  const { data: nfts, isLoading } = useNFTs(contract, {
    count: nftsPerPage,
    start: (page - 1) * nftsPerPage,
  });
  const { data: nft, isLoading: nftLoading } = useNFT(contract, search);
  const { data: totalCount } = useTotalCount(contract);

  return (
    <div className="text-neutral-200 bg-[#0A0A0A] m-0 p-0">
      <Header />

      <div className="w-full flex flex-col mx-auto py-8 px-4 min-h-screen">
        <input
          type="text"
          onChange={(e) => setSearch(Number(e.target.value))}
          className="w-96 h-12 bg-[#2E4973] text-white px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E4973] focus:ring-opacity-50 mx-auto mb-8"
          placeholder="Search by ID"
        />
        {search && nftLoading ? <Skeleton /> : null}
        {search && nft ? (
          <NFTCard
            nft={nft}
            key={nft.metadata.id}
            setSelectedNft={setSelectedNft}
          />
        ) : null}
        {selectedNft && (
          <NFTModal nft={selectedNft} setSelectedNft={setSelectedNft} />
        )}
        {isLoading && (
          <div className="flex flex-wrap gap-8">
            {Array.from({ length: 100 }).map((_, i) => (
              <Skeleton />
            ))}
          </div>
        )}
        <Aurora
          size={{ width: "1800px", height: "700px" }}
          pos={{ top: "80%", left: "50%" }}
          color="hsl(277deg 59% 39% / 20%)"
        />
        {nfts && !search && (
          <div className="flex flex-wrap gap-8">
            {nfts.map((nft) => (
              <NFTCard
                nft={nft}
                key={nft.metadata.id}
                setSelectedNft={setSelectedNft}
              />
            ))}
          </div>
        )}

        {!isLoading && !search && (
          <PaginationHelper
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
