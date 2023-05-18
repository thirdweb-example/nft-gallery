import { chainConst, contractConst } from "@/consts/parameters";
import { truncateAddress } from "@/utils/truncateAddress";
import type { FC } from "react";

export const PoweredBy: FC = () => {
  const urlParams = new URL(window.location.toString()).searchParams;
  const contractAddress = urlParams.get("contract") || contractConst || "";

  return (
    <a
      href={`https://thirdweb.com/${chainConst}/${contractAddress}`}
      target="_blank"
      rel="noreferrer"
      className="mr-4 flex max-w-[163px] cursor-pointer items-center justify-center gap-3 rounded-lg bg-white/5 px-4 py-2 shadow-2xl md:ml-auto"
    >
      <img
        className="h-4 w-6 object-contain"
        src="/thirdweb.svg"
        alt="thirdweb"
      />
      <div className="flex flex-col">
        <p className="text-xs font-semibold text-white">
          {truncateAddress(contractAddress)}
        </p>
        <p className="text-[8px] font-bold text-white/50">
          powered by thirdweb
        </p>
      </div>
    </a>
  );
};
