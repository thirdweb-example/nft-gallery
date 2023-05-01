import { NFT } from "@thirdweb-dev/sdk";
import type { FC } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";

interface INFTModalProps {
  nft: NFT;
  setSelectedNft: (nft: NFT | null) => void;
}

export const NFTModal: FC<INFTModalProps> = ({ nft, setSelectedNft }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={nft ? true : false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setSelectedNft(null)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 transition-opacity blur-[10px] backdrop-filter backdrop-blur-[4px]" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all sm:my-8 w-[80vw]">
                <div className="bg-[#2E4973] flex w-full md:flex-row flex-col">
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    className="!h-[650px] object-contain !w-[650px] rounded-lg"
                  />
                  <div className="flex flex-col mt-4 mx-8 w-full items-start">
                    <h2 className="text-xl text-gray-200">
                      {String(nft.metadata.name).split(" ")[0]}
                    </h2>
                    <h1 className="text-3xl text-white font-bold">
                      NO. {String(nft.metadata.name).split(" ")[1]}
                    </h1>

                    <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                      {/* @ts-ignore */}
                      {nft.metadata.attributes?.map(
                        (attr: { trait_type: string; value: string }) => (
                          <div
                            key={attr.trait_type}
                            className="flex flex-col items-center rounded-lg p-4 w-full bg-black/50 border-2 border-gray-900"
                          >
                            <h2 className="text-md text-gray-500">
                              {attr.trait_type}
                            </h2>
                            <h1 className="text-lg text-gray-200">
                              {attr.value}
                            </h1>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
