import { BigNumber } from "ethers";
import type { FC } from "react";
import { PaginationHelper } from "../PaginationHelper";
import { PoweredBy } from "../PoweredBy";

interface IProps {
  page: number;
  setPage: (page: number) => void;
  nftsPerPage: number;
  totalCount: BigNumber | undefined;
}

export const Footer: FC<IProps> = ({
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
    <div className="mt-10 flex w-full flex-col items-center gap-6 md:flex-row md:justify-between md:gap-0">
      <h3 className="text-2xl font-bold text-[#646D7A]">
        {end} / {totalCount.toNumber().toLocaleString()}
      </h3>

      <PaginationHelper page={page} noOfPages={noOfPages} setPage={setPage} />
      <PoweredBy />
    </div>
  );
};
