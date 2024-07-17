import { memo, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { atom, useAtom, useSetAtom } from "jotai";
import Head from 'next/head'

import { useUser } from "@refeed/features/hooks/useUser";
import { useItemData, useOpenItem } from "@refeed/features/item/useItemDataWeb";
import { debounce } from "@refeed/lib/debounce";
import type { FeedType } from "@refeed/types/feed";
import type { ItemType } from "@refeed/types/item";

import { BookmarkButton } from "../../features/bookmarks/BookmarkButton";
import BookmarkFolderButton from "../../features/bookmarks/BookmarkFolderButton";
import { ShortTermBookmarkButton } from "../../features/bookmarks/ShortTermBookmarkButton";
import { useUpdateFeeds } from "../../features/feed/useUpdateFeeds";
import { PricingDialog } from "../../features/pricing/PricingDialog";
import useWindowSize from "../../lib/useWindowSize";
import Sharing from "../sharing/Sharing";
import { Article } from "./Article";
import { CopyLinkButton } from "./CopyLinkButton";
import { useReaderAnimation } from "./useReaderAnimation";
import { decodeHtmlEntities } from "@refeed/lib/decodeHtmlEntities";
import TryNowButton from "../../components/landing/TryNowButton";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js'
import MarketCard from "./MarketCard";

export const fullscreenAtom = atom(false);
export const titleAtom = atom("Title");

async function useRelatedMarkets(embedding) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return supabase.rpc('match_documents', {
    query_embedding: embedding, // pass the query embedding
    match_threshold: 0.803, // choose an appropriate threshold for your data
    match_count: 3, // choose the number of matches
  }).then(({ data: documents }) => {
    return documents;
  }).catch(error => {
    console.error("match documents error: " + error);
    return [];
  });
}

const Reader = ({ item }) => {
  const [markets, setMarkets] = useState([]);
  const { width: windowWidth } = useWindowSize();
  const { fullscreen, widthStyle, transitionDuration } = useReaderAnimation();

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const fetchedMarkets = await useRelatedMarkets(item.embedding_json.embedding);
        setMarkets(fetchedMarkets);
      } catch (error) {
        console.error('Failed to fetch related markets:', error);
      }
    };

    fetchMarkets();
  }, [item]);

  return (
    <motion.div
      // layout="preserve-aspect"
      className={clsx(
        "fixed z-30 w-full transform overflow-hidden bg-white py-0.5 md:left-auto md:w-[65%] dark:bg-[#0f0f10]",
        windowWidth! > 500 &&
        (fullscreen
          ? `left-0 right-0 top-0 h-full`
          : `left-1 top-1.5 mx-1 h-[98.5vh] border-[1.5px] border-neutral-400/25 shadow-[rgba(0,0,0,0.05)_0px_0px_1px,rgba(0,0,0,0.04)_0px_15px_30px] lg:w-[36%] dark:border-[#24252A] dark:bg-[#0f0f10] dark:shadow-none`),
      )}
      transition={{
        duration: 0.2,
      }}
      style={widthStyle}
    >
      <div className="flex flex-row items-center rounded-t border-b border-[#f0f0f0] bg-[#fcfcfc] py-2.5 font-bold dark:border-[#303030]/90 dark:bg-[#141415]">
        <div className={`${fullscreen ? "mx-auto w-[680px]" : "w-[90%]"}`}>
          <div
            className={`flex  justify-between`}
          >
            <div className="flex space-x-4">
              {windowWidth > 500 && <CopyLinkButton />}
              {/* <Sharing/> */}
            </div>
            <Link href="/signup" style={{ marginRight: windowWidth < 500 ? '1em' : '0' }}>
              <TryNowButton />
            </Link>
          </div>
        </div>
      </div>
      <div
        className="h-full w-full overflow-hidden"
        style={{
          backfaceVisibility: "hidden",
        }}
      >
        <div className="flex w-full">
          <div
            key={item.id}
            className="scrollbar-rounded-md w-full flex-shrink-0 overflow-y-scroll overscroll-none scrollbar scrollbar-thumb-neutral-300 scrollbar-thumb-rounded-md scrollbar-w-1 md:overscroll-contain dark:bg-[#0f0f10] dark:scrollbar-thumb-[#404245]"
          >
            {item.title && (
              <div className={fullscreen ? "mx-auto md:w-[650px]" : "w-full"}>
                <div className="flex flex-col items-center pt-[1px]">
                  <Article
                    FeedType="one"
                    item={item}
                    Type={windowWidth > 500 ? "Full" : "Popup"}
                    markets={markets}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Reader;