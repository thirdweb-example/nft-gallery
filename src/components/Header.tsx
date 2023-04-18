import { ConnectWallet } from "@thirdweb-dev/react";
import { Aurora } from "./Aurora";

export const Header: React.FC = () => {
  return (
    <header className="w-full p-4 mb-12">
      <Aurora
        size={{ width: "1800px", height: "700px" }}
        pos={{ top: "0%", left: "50%" }}
        color="hsl(277deg 59% 39% / 20%)"
      />

      <div className="mx-auto flex justify-between items-center max-w-7xl">
        <div>
          <img
            className="md:hidden w-12 h-12 object-contain"
            src="/thirdweb.svg"
            alt="thirdweb"
          />
          <img
            className="hidden md:block w-48 h-7 object-contain"
            src="/logo.png"
            alt="thirdweb"
          />
        </div>

        <div className="max-w-xs">
          <ConnectWallet theme="dark" />
        </div>
      </div>
    </header>
  );
};
