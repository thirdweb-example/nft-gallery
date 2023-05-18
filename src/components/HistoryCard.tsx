import { blockExplorer } from "@/consts/parameters";
import { LinkIcon } from "@/icons/LinkIcon";
import { truncateAddress } from "@/utils/truncateAddress";
import type { ContractEvent } from "@thirdweb-dev/sdk";
import type { FC } from "react";

interface HistoryCardProps {
  event: ContractEvent<Record<string, any>>;
}

export const HistoryCard: FC<HistoryCardProps> = ({ event }) => {
  return (
    <a
      href={`${blockExplorer}/tx/${event.transaction.transactionHash}`}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col items-center justify-evenly gap-4 rounded-xl border-2 border-gray-800 p-4 lg:flex-row"
      key={event.transaction.transactionHash}
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-[#646D7A] ">EVENT</p>
        <p className="text-md font-bold text-white">{event.eventName}</p>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-[#646D7A] ">FROM</p>
          <p className="text-md font-bold text-[#646d7a]">
            {truncateAddress(event.data.from)}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-[#646D7A] ">TO</p>
          <p className="text-md font-bold text-[#646d7a]">
            {truncateAddress(event.data.to)}
          </p>
        </div>
      </div>

      <LinkIcon />
    </a>
  );
};
