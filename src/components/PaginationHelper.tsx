import { BigNumber } from "ethers";
import { FC } from "react";

interface IProps {
  page: number;
  setPage: (page: number) => void;
  nftsPerPage: number;
  totalCount: BigNumber | undefined;
}

const PaginationHelper: FC<IProps> = ({
  page,
  setPage,
  nftsPerPage,
  totalCount,
}) => {
  if (!totalCount) return null;
  const noOfPages = Math.ceil(totalCount.toNumber() / nftsPerPage);
  const start = (page - 1) * nftsPerPage;
  const end = start + nftsPerPage;

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex items-center">
        <button
          className="text-white bg-[#2E4973] px-4 py-2 rounded-lg mr-4"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <input
          type="number"
          className="bg-[#2E4973] text-white rounded-lg mx-4 w-20 p-2"
          value={page}
          onChange={(e) => setPage(Number(e.target.value))}
        />

        <button
          className="text-white bg-[#2E4973] px-4 py-2 rounded-lg"
          onClick={() => setPage(page + 1)}
          disabled={page === noOfPages}
        >
          Next
        </button>

        <p className="text-white ml-4">
          {start} - {end - 1} of {totalCount.toNumber()}
        </p>

        <p className="text-white ml-4">
          Page {page} of {noOfPages}
        </p>
      </div>
    </div>
  );
};

export { PaginationHelper };
