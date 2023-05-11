import { ConnectWallet } from "@thirdweb-dev/react";
import { Aurora } from "../Aurora";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="mb-12 w-full p-4">
      <Aurora
        size={{ width: "1800px", height: "700px" }}
        pos={{ top: "0%", left: "50%" }}
        color="hsl(277deg 59% 39% / 20%)"
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/">
          <div>
            <img
              className="h-12 w-12 object-contain md:hidden"
              src="/thirdweb.svg"
              alt="thirdweb"
            />
            <img
              className="hidden h-7 w-48 object-contain md:block"
              src="/logo.png"
              alt="thirdweb"
            />
          </div>
        </Link>

        <div className="max-w-xs">
          <ConnectWallet theme="dark" />
        </div>
      </div>
    </header>
  );
};
