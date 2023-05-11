import { contractAddress } from "@/details/contractAddress";
import { truncateAddress } from "@/utils/truncateAddress";
import type { FC } from "react";

export const PoweredBy: FC = () => {
  return (
    <div className="bg-white/5 p-2 gap-3 shadow-2xl max-w-[250px] ml-auto mr-4 rounded-lg flex items-center justify-center">
      <img
        className="w-10 h-10 object-contain"
        src="/thirdweb.svg"
        alt="thirdweb"
      />
      <div className="flex flex-col">
        <p className="text-white text-md font-medium">
          {truncateAddress(contractAddress)}
        </p>
        <p className="text-white/50 text-xs font-bold">powered by thirdweb</p>
      </div>
    </div>
  );
};
