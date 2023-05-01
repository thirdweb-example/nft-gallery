import type { FC } from "react";

export const Skeleton: FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 justify-center mx-auto cursor-pointer hover:scale-105 transition-all duration-300">
      <div className="!w-60 !h-60 rounded-lg bg-gray-800 animate-pulse" />
      <div className="flex flex-col items-center">
        <div className="w-32 h-4 bg-gray-800 animate-pulse" />
        <div className="w-32 h-4 bg-gray-800 animate-pulse" />
      </div>
    </div>
  );
};
