import {
  useContract,
  useNFTs,
  useNFT,
  useTotalCount,
  ThirdwebSDK,
  NFT,
} from "@thirdweb-dev/react";
import { FC, useState } from "react";
import {
  Header,
  NFTCard,
  NFTModal,
  Skeleton,
  Aurora,
  PaginationHelper,
} from "@/components";
import { GetStaticProps } from "next";

interface attribute {
  trait_type: string;
  value: string;
}

interface HomeProps {
  nfts: NFT[];
  attributes: any;
}

const Home: FC<HomeProps> = ({ nfts, attributes }) => {
  console.log(attributes);
  const nftsPerPage = 100;
  const { contract } = useContract(
    "0xed5af388653567af2f388e6224dc7c4b3241c544"
  );
  const [page, setPage] = useState(1);
  const [selectedNft, setSelectedNft] = useState<any>(null);
  const [search, setSearch] = useState<number | null>(null);
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

        <Aurora
          size={{ width: "1800px", height: "700px" }}
          pos={{ top: "80%", left: "50%" }}
          color="hsl(277deg 59% 39% / 20%)"
        />
        {nfts && !search && (
          <div className="flex flex-wrap gap-8">
            {nfts
              .slice((page - 1) * nftsPerPage, page * nftsPerPage)
              .map((nft) => (
                <NFTCard
                  nft={nft}
                  key={nft.metadata.id}
                  setSelectedNft={setSelectedNft}
                />
              ))}
          </div>
        )}

        {!search && (
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
};

export default Home;

// @ts-ignore
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const sdk = new ThirdwebSDK("ethereum");

    const nftDrop = await sdk.getContract(
      "0xed5af388653567af2f388e6224dc7c4b3241c544",
      "nft-drop"
    );

    // const totalCount = await nftDrop.erc721.totalCirculatingSupply();

    // if (!totalCount) return;

    const nfts: NFT[] = await nftDrop.erc721.getAll({
      count: 10000,
    });

    const attributes = nfts.reduce((acc: any, nft) => {
      const attributes = nft.metadata.attributes as unknown as attribute[];

      attributes.forEach((attribute) => {
        const { trait_type, value } = attribute;

        if (!acc[trait_type]) {
          acc[trait_type] = [];
        }

        if (!acc[trait_type].includes(value)) {
          acc[trait_type].push(value);
        }
      });

      return acc;
    }, {});

    console.log(attributes);

    return {
      props: {
        nfts,
        attributes,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        nfts: [],
        attributes: {},
      },
    };
  }
};
