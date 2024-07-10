import Balancer from "react-wrap-balancer";

import { decodeHtmlEntities } from "@refeed/lib/decodeHtmlEntities";

import type { FeedTypes } from "../../types/feed";

export const Markets = (props: { title: string; FeedType: FeedTypes }) => (
  <Balancer
    className={`w-fit select-text pl-2 pt-1 text-[12px] leading-[18px] tracking-[-0.005em] subpixel-antialiased md:w-[285px] lg:w-[450px] ${
      props.FeedType != "bookmarks"
        ? "text-[#333338] dark:text-stone-200"
        : null
    }`}
    preferNative={false}
    ratio={0.4}
  >
    <span className="underline decoration-dotted">{decodeHtmlEntities(props.title)}</span>
  </Balancer>
);

export const CardTitle = (props: { title: string; FeedType: FeedTypes }) => (
  <Balancer
    className={`w-fit select-text pl-2 pt-1 text-[15px] font-semibold leading-[18px] tracking-[-0.005em] subpixel-antialiased xl:w-10/12 ${
      props.FeedType != "bookmarks"
        ? "text-[#333338] dark:text-stone-200"
        : null
    }`}
    preferNative={false}
    ratio={0.4}
  >
    {decodeHtmlEntities(props.title)}
  </Balancer>
);
