import { contractAddress } from "@/details/contractAddress";
import { truncateAddress } from "@/utils/truncateAddress";
import type { FC } from "react";

export const PoweredBy: FC = () => {
  return (
    <div className="mr-4 flex max-w-[250px] items-center justify-center gap-3 rounded-lg bg-white/5 p-2 shadow-2xl md:ml-auto">
      <img
        className="h-10 w-10 object-contain"
        src="/thirdweb.svg"
        alt="thirdweb"
      />
      <div className="flex flex-col">
        <p className="text-md font-medium text-white">
          {truncateAddress(contractAddress)}
        </p>
        <p className="text-xs font-bold text-white/50">powered by thirdweb</p>
      </div>
    </div>
  );
};
