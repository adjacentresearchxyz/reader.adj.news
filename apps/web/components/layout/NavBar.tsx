import { useRouter } from "next/router";
import { LayoutTypes } from "@components/feed/FeedLayout";
import { SideBarWidth } from "@components/layout/SideBar";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { motion } from "framer-motion";
import { PanelLeft } from "lucide-react";
import { useWindowSize } from "usehooks-ts";
import Link from "next/link";

import { trimTitle } from "../../lib/trimTitle";
import { feedLayout } from "../../stores/ui";
import { ThemedSkeleton } from "../ui/Skeleton";
import { NavBarButtons } from "./NavBarButtons";

// for search pulled from SideBar.tsx
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { kmenu } from "../../stores/ui";

interface NavBarTypes {
  feedId?: string;
  feedUrl?: string;
  hideButtons?: boolean;
  title?: string;
  recentPage?: boolean;
  bookmarkPage?: boolean;
}

export default function NavBar(props: NavBarTypes) {
  const { title } = props;
  const [width, setWidth] = useAtom(SideBarWidth);
  const [Layout] = useAtom(feedLayout);

  const { width: windowWidth } = useWindowSize();

  const { query } = useRouter();
  const { item: itemParam, search } = query;
  const readerOpen = itemParam != undefined || search != undefined;

  const isMobile = windowWidth < 500;

  const SearchSelect = () => {
    const setKmenu = useSetAtom(kmenu);

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setKmenu(true);
    };

    return (
      <Link href={"search"} shallow={true} onClick={handleClick}>
        <Search />
      </Link>
    );
  };

  const Search = () => {
    return (
      <div className="flex flex-none cursor-pointer flex-col gap-3">
        <div className="flex flex-1 flex-col">
          <div className="capacitor:active:opacity-70 dark:hover:text-near-white flex flex-1 items-center space-x-1 rounded-[7px] border border-neutral-300/60 bg-white px-2 py-1 text-sm text-neutral-400 shadow-sm shadow-black/5 transition duration-150 ease-in-out hover:bg-white hover:text-neutral-500 dark:border-[#fcfcfd]/5 dark:bg-[#202022] dark:text-neutral-500 dark:shadow-black/10 dark:hover:bg-[#202022]">
            <div className="flex-none">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  shapeRendering="geometricPrecision"
                  d="M13.8588 13.8588C14.7183 12.9992 15.25 11.8117 15.25 10.5C15.25 7.87665 13.1234 5.75 10.5 5.75C7.87665 5.75 5.75 7.87665 5.75 10.5C5.75 13.1234 7.87665 15.25 10.5 15.25C11.8117 15.25 12.9992 14.7183 13.8588 13.8588ZM13.8588 13.8588L18.5 18.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className="w-0 flex-1 truncate">Search your feeds...</div>
            <kbd className="inline-flex flex-none items-center rounded px-2 font-sans text-xs font-medium uppercase ">
              <span className="text-neutral-400 dark:text-neutral-500/90">
                ctrl&thinsp;k
              </span>
            </kbd>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog.Root>
      <div
        className={`sticky top-0 z-10 flex h-10 border-b border-[#f0f0f0] bg-white/95 backdrop-blur dark:border-[#24252A] dark:bg-[#0f0f10]`}
      >
        <PanelLeft
          size={18}
          onClick={() => (width != 240 ? setWidth(0) : setWidth(240))}
          className={clsx(
            "left-3 top-2.5 stroke-neutral-400 stroke-[2] dark:stroke-stone-400",
            "absolute md:hidden",
          )}
        />
        {title == "Discover" ? (
          <div className={`flex w-full items-center overflow-x-auto scrollbar-hide`}>
            <motion.div
              layout="preserve-aspect"
              transition={{
                duration: title ? 0.1 : 0,
              }}
              className="mx-auto flex justify-between items-center px-4 py-4 w-full"
            >
              <div className="hidden sm:block sm:w-[250px] md:mx-0 md:w-[350px] lg:w-[500px] xl:w-[750px]">
                <h1 className={`-ml-1 truncate text-ellipsis font-bold tracking-[-0.01em]`}>
                  Discover
                </h1>
              </div>
              <div className="flex-grow">
                <SearchSelect />
              </div>
              <div className="sm:flex-grow hidden">
                <SearchSelect />
              </div>
            </motion.div>
          </div>
        ) : (
          <div
            className={`flex w-full items-center overflow-x-auto scrollbar-hide`}
          >
            <LayoutTypes Layout={Layout} readerOpen={readerOpen}>
              <div
                className={clsx(
                  Layout == "Article" && "md:ml-3 md:w-[39.5em] lg:ml-6",
                  Layout == "Magazine" &&
                  !isMobile &&
                  "md:ml-3 md:w-[35em] lg:ml-8",
                  Layout == "Card" && "lg:ml-2",
                )}
              >
                {title != "" ? (
                  <h1
                    className={`truncate text-ellipsis font-bold tracking-[-0.01em]`}
                  >
                    {trimTitle(title, 30)}
                  </h1>
                ) : (
                  <ThemedSkeleton className="h-5 min-w-[100px] max-w-[200px] py-2 dark:bg-[#1a1a1a]" />
                )}
              </div>
              <div className="md:w-[250px]" />
              <div className="flex-grow sm:hidden">
                <SearchSelect />
              </div>
              <div className="sm:flex-grow hidden">
                <SearchSelect />
              </div>
            </LayoutTypes>
          </div>
        )}
        <NavBarButtons {...props} />
      </div>
    </Dialog.Root>
  );
}
