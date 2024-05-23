import { blockExplorer } from "@/consts/parameters";
import { LinkIcon } from "@/icons/LinkIcon";
import { truncateAddress } from "@/utils/truncateAddress";
import type { FC } from "react";

interface HistoryCardProps {
  // todo: add type after migration to v5
  event: any;
}

export const HistoryCard: FC<HistoryCardProps> = ({ event }) => {
  return (
    <a
      href={`${blockExplorer}/tx/${event.transactionHash}`}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col items-center justify-evenly gap-4 rounded-xl border-2 border-gray-800 p-4 lg:flex-row"
      key={event.transactionHash}
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-[#646D7A] ">EVENT</p>
        <p className="text-md font-bold text-white">{event.eventName}</p>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-[#646D7A] ">FROM</p>
          <p className="text-md font-bold text-[#646d7a]">
            {event.args.from ? truncateAddress(event.args.from) : "N/A"}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-[#646D7A] ">TO</p>
          <p className="text-md font-bold text-[#646d7a]">
            {event.args.to ? truncateAddress(event.args.to) : "N/A"}
          </p>
        </div>
      </div>

      <LinkIcon />
    </a>
  );
};
