import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { domAnimation, LazyMotion, m } from "framer-motion";

import TimeBookmarksCard from "./TimeBookmarksCard";

export const BookmarksSection = () => {
  return (
    <div className="mx-auto mb-2 mt-10 items-center justify-center space-y-6 lg:mx-0 lg:flex lg:space-x-6 lg:space-y-0">
      <TimeBookmarksCard />
      <BookmarkFolderCard />
      <NotesCard />
    </div>
  );
};

export const NotesCard = () => {
  const [expanded, setExpanded] = useState(false);

  const parentVariants = {
    hover: {
      height: "225px",
      scale: 1.04,
      transition: { duration: 0.5 },
    },
    hidden: { height: "175px", scale: 1 },
  };

  const contentVariants = {
    hover: { opacity: 1, transition: { duration: 0.5 }, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        onHoverStart={() => setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
      >
        <Card title="Notes" description="Write notes while reading">
          <div className="mt-4">
            <m.div
              whileHover="hover"
              animate={expanded ? "hover" : "hidden"}
              variants={parentVariants}
              className={`mb-4 w-[245px] overflow-hidden rounded-lg border border-neutral-200 bg-white pb-2 pt-2 shadow-[0px_20px_70px_-10px_hsla(227,30%,20%,0.08),0px_10px_24px_-8px_hsla(227,30%,20%,0.04),0px_1px_4px_-1px_hsla(227,30%,20%,0.06)]  ${expanded
                ? "border border-neutral-200"
                : "border border-neutral-200"
                }`}
            >
              <div className="hackernews-logo-shadow h-[22px mb-2 ml-2.5 mt-1 flex w-[22px] items-center justify-center rounded bg-[#FF6600]/50">
                <Image
                  alt="Hacker News Logo"
                  height="20"
                  width="20"
                  className="opacity-50"
                  src="/hacker-news.ico"
                />
              </div>
              <h2 className="mx-2 text-sm font-medium text-neutral-700">
                Does the rock float?
              </h2>
              <h3 className="mx-2 text-sm font-medium text-neutral-400 dark:text-stone-400">
                twitter.com
              </h3>
              <div className="flex flex-col gap-2.5">
                <BlurredText className="mx-3 mt-3 h-2.5 rounded-sm" />
                <BlurredText className="mx-3 h-2.5 rounded-sm" />
              </div>
              <m.div
                initial="hidden"
                animate={expanded ? "hover" : "hidden"}
                variants={contentVariants}
              >
                <div className="flex justify-center">
                  <textarea
                    className={`my-4 h-[75px] w-11/12 resize-none rounded-md border-neutral-200 `}
                    name="Folders"
                    placeholder="Write Note"
                    rows={5}
                    maxLength={50}
                  />
                </div>
              </m.div>
            </m.div>
          </div>
        </Card>
      </m.div>
    </LazyMotion>
  );
};

export const BookmarkFolderCard = () => {
  const [expanded, setExpanded] = useState(false);

  const card1 = {
    hover: {
      opacity: 1,
      y: -16,
      scale: 1,
    },
    hidden: {
      scale: 1,
      opacity: 0,
      x: 0,
      y: 0,
    },
  };

  const card2 = {
    hover: {
      opacity: 1,
      y: -32,
      scale: 0.95,
    },
    hidden: {
      scale: 1,
      opacity: 0,
      x: 0,
      y: 0,
    },
  };

  const card3 = {
    hover: {
      opacity: 1,
      y: -48,
      scale: 0.9,
    },
    hidden: {
      scale: 1,
      opacity: 0,
      x: 0,
      y: 0,
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        onHoverStart={() => setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
      >
        <Card
          description="Organize your Bookmarks to into Folders"
          title="Bookmark Folders via Refeed"
        >
          <m.div className={`${expanded ? "" : null}`}>
            <m.div
              initial="hidden"
              animate={expanded ? "hover" : "hidden"}
              variants={card3}
              className="flex h-full items-center justify-center"
            >
              <BookmarkFolders
                className={` ${expanded ? "border border-neutral-200" : null} `}
              />
            </m.div>
            <m.div
              animate={expanded ? "hover" : "hidden"}
              variants={card2}
              initial="hidden"
              className="flex h-full items-center justify-center"
            >
              <BookmarkFolders
                className={` ${expanded ? "border border-neutral-200" : null} `}
              />
            </m.div>
            <m.div
              initial="hidden"
              animate={expanded ? "hover" : "hidden"}
              variants={card1}
              className="flex h-full items-center justify-center"
            >
              <BookmarkFolders
                className={` ${expanded ? "border border-neutral-200 " : null
                  } `}
              />
            </m.div>
            <m.div
              animate={expanded ? { scale: 1.05 } : { scale: 1 }}
              className={"flex h-full items-center justify-center"}
            >
              <BookmarkFolders className="border border-neutral-200 shadow-[0px_20px_70px_-10px_hsla(227,30%,20%,0.08),0px_10px_24px_-8px_hsla(227,30%,20%,0.04),0px_1px_4px_-1px_hsla(227,30%,20%,0.06)]" />
            </m.div>
          </m.div>
        </Card>
      </m.div>
    </LazyMotion>
  );
};

export const Items = ({ className }: { className: string }) => {
  return (
    <div
      className={clsx(
        "absolute mx-1 mt-1 flex w-[300px] cursor-default flex-row space-x-[4px] rounded-lg border border-neutral-200 bg-white pb-2 pt-2 shadow-[0px_20px_70px_-10px_hsla(227,30%,20%,0.08),0px_10px_24px_-8px_hsla(227,30%,20%,0.04),0px_1px_4px_-1px_hsla(227,30%,20%,0.06)] dark:hover:bg-[#060606]",
        className,
      )}
    >
      <div
        className={`relative top-1 mb-3 ml-2 mr-1.5 h-20 w-[175px] rounded-md bg-[#DDDDDD] dark:bg-[#0f0f10] `}
      >
        <div className="h-full rounded bg-neutral-100 shadow-[0_0px_0px_1.25px_rgba(31,34,37,0.09),0px_12px_24px_-4px_rgba(0,0,0,0.02),0px_8px_16px_-4px_rgba(0,0,0,0.06)]" />
      </div>
      <div className="flex w-full flex-col">
        <div className="mb-2 h-5 w-9/12 rounded bg-neutral-100 pl-2 pt-1 shadow-[0_0px_0px_1.25px_rgba(31,34,37,0.09),0px_12px_24px_-4px_rgba(0,0,0,0.02),0px_8px_16px_-4px_rgba(0,0,0,0.06)]" />
      </div>
    </div>
  );
};

export const BookmarkFolders = ({ className }: { className: string }) => {
  return (
    <div
      className={clsx(
        "dark:hover:bg-[#060606]) absolute mx-1 mt-1 flex w-[300px] cursor-default flex-row space-x-[4px] rounded-lg bg-white pb-2 pt-2",
        className,
      )}
    >
      <div
        className={`relative top-1 mb-3 ml-2 mr-1.5 h-20 w-[175px] rounded-md bg-[#DDDDDD] dark:bg-[#0f0f10] `}
      >
        <div className="h-full rounded bg-neutral-100 shadow-[0_0px_0px_1.25px_rgba(31,34,37,0.09),0px_12px_24px_-4px_rgba(0,0,0,0.02),0px_8px_16px_-4px_rgba(0,0,0,0.06)]" />
      </div>
      <div className="flex w-full flex-col">
        <div className="mb-2 h-5 w-9/12 rounded bg-neutral-100 pl-2 pt-1 shadow-[0_0px_0px_1.25px_rgba(31,34,37,0.09),0px_12px_24px_-4px_rgba(0,0,0,0.02),0px_8px_16px_-4px_rgba(0,0,0,0.06)]" />
        <div>
          <span className="ml-1.5 h-4 rounded bg-[#0496FF]/10 px-1 text-right text-xs font-[500] text-sky-500">
            To Research
          </span>
        </div>
      </div>
    </div>
  );
};

export const Card = (props: {
  description: string;
  title: string;
  multipler?: number;
  background?: string;
  children: JSX.Element;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        onHoverStart={() => setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
        animate={expanded ? "hover" : "hidden"}
        // variants={cardVariants}
        className={`mx-auto flex overflow-hidden ${props.multipler ? "sm:w-[400px] md:w-[825px]" : "md:w-[400px]"
          } mx-1 h-[400px] rounded-xl border   ${expanded
            ? "bg-neutral-50"
            : props.background
              ? props.background
              : " bg-[#fcfcfc]"
          } md:mx-0 ${expanded ? "" : null}`}
      >
        <div className="flex w-full flex-col">
          <div className="flex h-full select-none items-center justify-center">
            {props.children}
          </div>
          <div className="ml-6 mr-2 mt-4 flex flex-col pb-4">
            <h1 className="z-10 select-none text-lg font-[550]">
              {props.title}
            </h1>

            <h2 className="font-regular z-10 select-none text-lg text-neutral-400 dark:text-stone-400">
              {props.description}
            </h2>
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export const FullContentCard = () => {
  const [expanded, setExpanded] = useState(false);

  const parentVariants = {
    hover: {
      height: "225px",
      scale: 1.04,
      transition: { duration: 0.5 },
    },
    hidden: { height: "135px", scale: 1 },
  };

  const contentVariants = {
    hover: { opacity: 1, transition: { duration: 0.5 }, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        onHoverStart={() => setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
      >
        <Card
          title="Fetch full content via Refeed"
          description="Fetch the full website before visiting"
        >
          <div className="mt-4">
            <m.div
              whileHover="hover"
              animate={expanded ? "hover" : "hidden"}
              variants={parentVariants}
              className="mb-4 w-[245px] overflow-hidden rounded-lg border border-neutral-200 bg-white pb-2 pt-2 shadow-[0px_20px_70px_-10px_hsla(227,30%,20%,0.08),0px_10px_24px_-8px_hsla(227,30%,20%,0.04),0px_1px_4px_-1px_hsla(227,30%,20%,0.06)]"
            >
              <div className="shadow-1 h-[22px mb-2 ml-2.5 mt-1 flex w-[22px] items-center justify-center rounded bg-[#4C02E8]/20">
                <Image
                  alt="Verge Logo"
                  height="20"
                  width="20"
                  className="opacity-50"
                  src="/verge.ico"
                />
              </div>
              <h2 className="mx-2 text-sm font-medium text-neutral-700">
                Neuralink is recruiting subjects for the first human trial of
                its brain-computer interface
              </h2>
              <h3 className="mx-2 text-sm font-medium text-neutral-400 dark:text-stone-400">
                theverge.com
              </h3>
              <m.div
                initial="hidden"
                animate={expanded ? "hover" : "hidden"}
                variants={contentVariants}
              >
                <div className="flex h-full flex-col gap-2.5">
                  <BlurredText className="mx-3 mt-3 h-2.5 rounded-sm" />
                  <BlurredText className="mx-3 h-2.5 rounded-sm" />
                  <BlurredText className="mx-3 h-2.5 rounded-sm" />
                  <BlurredText className="mx-3 h-2.5 rounded-sm" />
                </div>
              </m.div>
            </m.div>
          </div>
        </Card>
      </m.div>
    </LazyMotion>
  );
};

export const BlurredText = ({ className }: { className: string }) => (
  <div
    className={clsx(
      "rounded bg-neutral-100 shadow-[0_0px_0px_1.25px_rgba(31,34,37,0.09),0px_12px_24px_-4px_rgba(0,0,0,0.02),0px_8px_16px_-4px_rgba(0,0,0,0.06)]",
      className,
    )}
  />
);

// make a card to highlight prediction market data
export const PredictionMarketCard = () => {
  const [expanded, setExpanded] = useState(true);

  const parentVariants = {
    hover: {
      height: "225px",
      scale: 1.04,
      transition: { duration: 0.5 },
    },
    hidden: { height: "135px", scale: 1 },
  };

  const contentVariants = {
    hover: { opacity: 1, transition: { duration: 0.5 }, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div>
        <Card
          title="Prediction Market Data"
          description="View prediction market data"
        >
          <div className="mt-4">
            <m.div
              animate="hover"
              variants={parentVariants}
              className="mb-4 w-[245px] h-[260px] overflow-hidden rounded-lg border border-neutral-200 bg-white pb-2 pt-2 shadow-[0px_20px_70px_-10px_hsla(227,30%,20%,0.08),0px_10px_24px_-8px_hsla(227,30%,20%,0.04),0px_1px_4px_-1px_hsla(227,30%,20%,0.06)]"
            >
              <div className="shadow-1 h-[22px mb-2 ml-2.5 mt-1 flex w-[22px] items-center justify-center rounded bg-[#4C02E8]/20">
                <Image
                  alt="WSJ Logo"
                  height="20"
                  width="20"
                  className="opacity-50"
                  src="/wsj.ico"
                />
              </div>
              <h2 className="mx-2 text-sm font-medium text-neutral-700">
                Iranian President, Foreign Minister Killed in Helicopter Crash
              </h2>
              <h3 className="mx-2 mb-1 text-sm font-medium text-neutral-400 dark:text-stone-400">
                wsj.com
              </h3>
              <h4 className="mx-2 text-sm font-small text-neutral-400 dark:text-stone-400 underline">
                View related markets ->
              </h4>
              <m.div
                initial
                animate={expanded ? "hover" : "hidden"}
                variants={contentVariants}
              >
                <div className="flex h-full flex-col gap-2.5">
                  <div className="mx-3 mt
                  -3 h-2.5 rounded-sm" />
                  <p className="mx-3 h-2.5 rounded-sm text-[10px]"><strong>4.94%</strong> Will Iran accuse Israel of causing the Iranian president's helicopter to crash?</p>
                  <p className="mx-3 mt-3 h-2.5 rounded-sm text-[10px]"><strong>98.06%</strong> Will Iran have a new president in power by the end of 2024?</p>
                </div>
              </m.div>
            </m.div>
          </div>
        </Card>
      </m.div>
    </LazyMotion>
  );
}

// Create a card like the predition market card but for showcases a historical API for market data and news 
export const APICard = () => {
  const [expanded, setExpanded] = useState(true);

  const parentVariants = {
    hover: {
      height: "225px",
      scale: 1.04,
      transition: { duration: 0.5 },
    },
    hidden: { height: "135px", scale: 1 },
  };

  const contentVariants = {
    hover: { opacity: 1, transition: { duration: 0.5 }, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div>
        <Card
          title="Historical API"
          description="Query historical markets and news"
        >
          <div className="mt-4">
            <m.div
              animate="hover"
              variants={parentVariants}
            >
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="350" height="200.000000pt" viewBox="0 0 694.000000 118.000000"
                preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)"
                  fill="#000000" stroke="none">
                  <path d="M0 590 l0 -590 3470 0 3470 0 0 590 0 590 -3470 0 -3470 0 0 -590z
m570 409 c0 -72 2 -81 20 -86 35 -9 24 -35 -12 -31 l-33 3 -3 88 c-3 79 -5 87
-22 87 -11 0 -20 5 -20 10 0 6 16 10 35 10 l35 0 0 -81z m406 56 c9 -14 20
-25 24 -25 4 0 12 11 18 25 6 14 18 25 27 25 20 0 19 -7 -7 -56 l-22 -41 27
-46 c31 -53 32 -57 13 -57 -8 0 -24 14 -37 31 l-21 30 -28 -33 c-39 -46 -50
-27 -18 30 l26 47 -24 40 c-13 22 -24 43 -24 48 0 17 31 5 46 -18z m330 3 c-3
-13 -6 -31 -6 -40 0 -10 -7 -18 -15 -18 -8 0 -15 8 -15 18 0 9 -3 27 -6 40 -5
19 -2 22 21 22 23 0 26 -3 21 -22z m182 5 c2 -9 -8 -13 -32 -13 -40 0 -56 -20
-56 -70 0 -39 16 -70 37 -70 13 0 14 7 9 41 -6 38 -5 40 16 37 20 -3 23 -9 23
-53 0 -47 -2 -50 -27 -53 -39 -5 -67 14 -84 55 -18 41 -11 81 18 118 16 21 27
25 56 23 19 -2 37 -9 40 -15z m140 0 c2 -9 -9 -13 -37 -13 -37 0 -41 -3 -41
-24 0 -20 6 -25 32 -28 46 -4 49 -28 4 -28 -31 0 -36 -3 -36 -24 0 -21 5 -25
38 -28 25 -2 37 -8 37 -18 0 -11 -12 -15 -50 -15 l-50 0 -3 84 c-2 46 0 91 2
98 7 18 98 14 104 -4z m159 0 c3 -7 -8 -13 -24 -15 -28 -3 -28 -3 -31 -86 -2
-60 -6 -82 -15 -79 -8 2 -13 33 -15 85 -3 80 -4 82 -27 82 -16 0 -25 6 -25 15
0 13 12 15 67 13 40 -2 68 -8 70 -15z m93 -10 c0 -16 -5 -35 -10 -43 -9 -13
-11 -13 -20 0 -5 8 -10 27 -10 43 0 20 5 27 20 27 15 0 20 -7 20 -27z m284
-67 c31 -52 56 -97 56 -100 0 -3 -6 -6 -14 -6 -11 0 -126 176 -126 194 0 3 6
6 14 6 7 0 39 -42 70 -94z m-1976 23 c2 -13 -3 -15 -23 -12 -31 6 -55 -12 -55
-42 0 -31 24 -49 55 -41 18 5 25 2 25 -9 0 -20 -39 -29 -73 -16 -50 19 -58 95
-13 127 27 19 80 15 84 -7z m60 -42 c2 -31 6 -57 11 -57 22 0 40 29 43 70 2
32 7 45 18 45 12 0 15 -14 15 -70 l0 -69 -40 -2 c-66 -2 -75 7 -75 82 0 48 3
65 13 62 7 -3 13 -27 15 -61z m232 33 c0 -20 -5 -30 -15 -30 -8 0 -15 7 -15
15 0 19 -9 19 -32 -2 -12 -11 -18 -30 -18 -60 0 -31 -4 -43 -12 -41 -13 4 -24
108 -15 132 3 6 28 12 56 13 50 2 51 2 51 -27z m420 -35 c0 -11 -12 -15 -50
-15 -38 0 -50 4 -50 15 0 11 12 15 50 15 38 0 50 -4 50 -15z m1115 -216 c0 -7
-8 -15 -17 -17 -18 -3 -25 18 -11 32 10 10 28 1 28 -15z m1325 -5 c0 -8 -7
-14 -15 -14 -15 0 -21 21 -9 33 10 9 24 -2 24 -19z m1266 15 c10 -17 -13 -36
-27 -22 -12 12 -4 33 11 33 5 0 12 -5 16 -11z m-4166 -26 c0 -16 -5 -35 -10
-43 -9 -13 -11 -13 -20 0 -5 8 -10 27 -10 43 0 20 5 27 20 27 15 0 20 -7 20
-27z m100 -3 c0 -27 2 -30 25 -24 41 10 55 -10 55 -83 0 -47 -3 -64 -12 -61
-8 3 -14 27 -16 61 -2 31 -6 57 -11 57 -22 0 -40 -29 -43 -69 -2 -25 -9 -46
-15 -49 -10 -3 -13 21 -13 97 0 83 3 101 15 101 10 0 15 -10 15 -30z m958 22
c-16 -40 -115 -192 -125 -192 -7 0 -13 3 -13 6 0 18 115 194 127 194 8 0 13
-4 11 -8z m142 2 c0 -19 -114 -194 -126 -194 -19 0 -20 -3 46 108 30 51 60 92
67 92 7 0 13 -3 13 -6z m710 -94 c0 -90 -8 -118 -25 -90 -3 6 -15 5 -30 -2
-58 -26 -90 68 -40 117 13 14 33 25 45 25 15 0 20 6 20 25 0 16 6 25 15 25 12
0 15 -18 15 -100z m870 6 c0 -63 -4 -97 -12 -102 -6 -4 -14 -2 -16 4 -3 9 -9
9 -23 1 -43 -23 -86 18 -74 71 7 33 48 70 76 70 14 0 19 7 19 25 0 16 6 25 15
25 12 0 15 -17 15 -94z m969 7 c-58 -98 -72 -117 -88 -112 -17 6 101 199 121
199 14 0 7 -18 -33 -87z m621 81 c0 -19 -114 -194 -126 -194 -19 0 -20 -3 46
108 30 51 60 92 67 92 7 0 13 -3 13 -6z m720 0 c0 -19 -114 -194 -126 -194
-19 0 -20 -3 46 108 30 51 60 92 67 92 7 0 13 -3 13 -6z m106 -2 c39 -26 46
-124 13 -167 -18 -22 -20 -29 -8 -36 8 -5 20 -9 27 -9 14 0 16 -16 2 -25 -12
-7 -44 9 -71 36 -10 10 -23 19 -27 19 -31 0 -43 130 -16 168 15 22 57 30 80
14z m84 -78 c5 -76 6 -79 30 -79 24 0 25 3 30 78 6 100 24 105 28 8 4 -88 -12
-121 -58 -121 -49 0 -60 21 -60 117 0 63 3 84 13 81 7 -3 14 -33 17 -84z m228
69 c2 -9 -9 -13 -37 -13 -37 0 -41 -3 -41 -24 0 -20 6 -25 32 -28 46 -4 49
-28 4 -28 -31 0 -36 -3 -36 -24 0 -21 5 -25 38 -28 25 -2 37 -8 37 -18 0 -11
-12 -15 -50 -15 l-50 0 -3 84 c-2 46 0 91 2 98 7 18 98 14 104 -4z m133 1 c14
-8 11 -61 -5 -77 -13 -12 -11 -19 9 -53 29 -46 30 -54 10 -54 -8 0 -27 18 -41
40 -15 22 -30 40 -35 40 -4 0 -9 -17 -11 -37 -2 -20 -9 -38 -15 -41 -10 -3
-13 21 -13 99 l0 102 46 -7 c25 -3 50 -8 55 -12z m77 -14 c21 -36 29 -37 44
-6 10 24 36 42 45 32 2 -2 -6 -24 -18 -48 -13 -23 -26 -65 -29 -92 -7 -63 -30
-75 -30 -15 0 28 -10 59 -29 95 -17 28 -27 55 -24 58 13 12 24 5 41 -24z m188
8 c-3 -13 -6 -31 -6 -40 0 -10 -7 -18 -15 -18 -8 0 -15 8 -15 18 0 9 -3 27 -6
40 -5 19 -2 22 21 22 23 0 26 -3 21 -22z m283 -78 c48 -79 57 -100 43 -100
-14 0 -85 105 -129 193 -2 4 3 7 11 7 8 0 42 -45 75 -100z m-5921 62 c2 -16
10 -22 28 -22 15 0 24 -6 24 -15 0 -9 -9 -15 -25 -15 -23 0 -25 -4 -25 -41 0
-41 1 -41 30 -35 35 6 44 -18 10 -29 -46 -14 -80 20 -80 81 0 15 -6 24 -15 24
-8 0 -15 5 -15 10 0 6 7 13 15 16 8 4 15 14 15 23 0 38 33 40 38 3z m142 4 c0
-19 6 -25 27 -28 39 -4 42 -28 3 -28 -30 0 -31 -1 -28 -37 3 -34 6 -38 31 -38
29 1 37 -19 11 -29 -44 -17 -74 9 -74 65 0 28 -4 39 -15 39 -8 0 -15 7 -15 15
0 8 7 15 15 15 9 0 15 9 15 25 0 16 6 25 15 25 9 0 15 -9 15 -24z m1730 0 c0
-19 6 -25 27 -28 39 -4 42 -28 3 -28 -30 0 -31 -1 -28 -37 3 -34 6 -38 31 -38
34 1 36 -22 3 -31 -41 -10 -66 11 -66 57 0 32 -4 42 -20 46 -11 3 -20 10 -20
15 0 5 9 12 20 15 13 3 20 14 20 29 0 15 6 24 15 24 9 0 15 -9 15 -24z m-1614
-27 c4 -8 9 -8 17 0 29 29 77 -5 77 -53 0 -42 -23 -72 -59 -79 -20 -4 -30 -13
-33 -28 -2 -12 -9 -24 -15 -27 -10 -3 -13 21 -13 97 0 93 8 119 26 90z m222
-6 c2 -9 -8 -13 -32 -13 -46 0 -45 -10 1 -35 46 -25 52 -48 19 -70 -31 -21
-96 -13 -96 11 0 11 9 13 39 8 53 -8 59 9 11 31 -42 19 -53 48 -28 73 16 16
80 11 86 -5z m120 -4 c4 -19 -19 -31 -38 -19 -18 11 -4 42 17 38 10 -2 19 -10
21 -19z m470 -43 c4 -72 -2 -93 -22 -77 -11 9 -19 9 -34 0 -25 -16 -49 -6 -63
25 -25 55 21 119 81 114 l35 -3 3 -59z m72 54 c35 23 70 -4 70 -53 0 -43 -22
-73 -59 -80 -20 -4 -31 -13 -33 -27 -2 -11 -7 -21 -13 -20 -11 0 -20 154 -10
178 4 10 9 11 18 4 8 -7 18 -7 27 -2z m160 -46 c0 -48 3 -57 20 -61 30 -8 18
-28 -16 -28 -28 0 -29 1 -32 58 -2 42 -7 57 -17 57 -8 0 -15 7 -15 15 0 10 10
15 30 15 30 0 30 0 30 -56z m488 -8 c4 -72 -2 -93 -22 -77 -11 9 -19 9 -34 0
-25 -16 -49 -6 -63 25 -25 55 21 119 81 114 l35 -3 3 -59z m284 -3 c4 -74 -3
-93 -26 -74 -10 8 -16 9 -21 1 -9 -15 -36 -12 -57 7 -47 43 -3 133 66 133 l34
0 4 -67z m288 -6 c5 -70 -1 -87 -23 -68 -8 6 -18 6 -27 1 -60 -38 -98 63 -45
116 19 19 34 24 58 22 l32 -3 5 -68z m268 -9 c2 -67 0 -80 -18 -98 -13 -13
-31 -20 -47 -18 -38 4 -42 28 -5 28 36 0 42 13 42 86 0 53 0 54 -30 54 -29 0
-38 9 -23 24 4 4 23 6 43 4 l35 -3 3 -77z m222 73 c0 -5 13 -4 29 2 47 17 63
-3 59 -77 -4 -73 -22 -81 -26 -11 -4 61 -15 75 -42 50 -14 -13 -20 -31 -20
-62 0 -31 -4 -43 -12 -41 -13 5 -24 109 -14 134 6 16 26 19 26 5z m212 -8 c10
-9 18 -27 18 -40 0 -20 -5 -23 -41 -23 -33 0 -40 -3 -37 -17 3 -14 13 -18 41
-17 45 2 51 -21 8 -31 -72 -16 -117 60 -70 119 23 30 54 33 81 9z m66 -15 l8
-33 12 33 c13 37 27 35 44 -6 10 -24 12 -25 15 -7 8 41 13 49 24 38 7 -7 7
-28 0 -69 -15 -80 -27 -88 -48 -34 l-18 44 -11 -39 c-17 -61 -37 -51 -50 25
-7 36 -10 68 -7 72 10 17 23 6 31 -24z m230 15 c2 -9 -8 -13 -32 -13 -46 0
-45 -10 1 -35 46 -25 52 -48 19 -70 -31 -21 -96 -13 -96 11 0 11 9 13 39 8 53
-8 59 9 11 31 -42 19 -53 48 -28 73 16 16 80 11 86 -5z m300 -60 c3 -67 -6
-91 -23 -63 -4 7 -13 6 -26 -1 -26 -14 -58 -2 -69 25 -21 56 26 120 84 114
l31 -3 3 -72z m52 67 c0 -7 7 -7 20 0 61 33 102 -55 53 -112 -8 -9 -28 -20
-44 -23 -23 -5 -29 -12 -29 -32 0 -15 -5 -23 -12 -21 -13 5 -24 157 -14 185 6
15 26 18 26 3z m188 -52 c2 -43 7 -58 17 -58 8 0 15 -7 15 -16 0 -11 -8 -14
-32 -12 -33 3 -33 4 -36 61 -2 42 -7 57 -17 57 -8 0 -15 4 -15 8 0 16 14 23
40 20 23 -3 25 -7 28 -60z m320 50 c7 -7 12 -35 12 -75 0 -47 -3 -64 -12 -61
-8 3 -14 27 -16 61 -2 31 -6 57 -11 57 -22 0 -40 -29 -43 -69 -2 -25 -9 -46
-15 -49 -10 -3 -13 16 -13 70 l0 73 43 2 c23 0 48 -4 55 -9z m146 -10 c29 -42
21 -58 -29 -58 -47 0 -56 -9 -30 -30 9 -7 26 -9 45 -5 23 5 30 3 30 -8 0 -9
-13 -18 -31 -22 -45 -10 -83 20 -87 68 -6 65 68 105 102 55z m54 -6 c5 -30 18
-28 26 4 9 33 27 26 42 -17 7 -19 13 -29 13 -22 1 6 5 24 11 38 18 47 27 17
16 -52 -13 -76 -34 -91 -50 -35 -10 35 -26 43 -26 14 0 -10 -6 -27 -14 -37
-13 -18 -14 -18 -24 1 -5 10 -13 45 -17 78 -6 48 -5 58 6 54 8 -3 15 -14 17
-26z m226 22 c28 -11 17 -24 -19 -24 -43 0 -45 -13 -5 -30 44 -18 56 -44 30
-70 -21 -21 -39 -24 -77 -14 -41 11 -27 33 17 27 50 -7 54 12 6 32 -41 17 -52
42 -30 66 17 19 49 24 78 13z m-4048 -133 c-10 -16 -36 -13 -43 5 -8 22 18 37
36 20 7 -8 10 -19 7 -25z m861 23 c8 -21 -13 -42 -28 -27 -13 13 -5 43 11 43
6 0 13 -7 17 -16z m720 0 c8 -21 -13 -42 -28 -27 -13 13 -5 43 11 43 6 0 13
-7 17 -16z m579 -23 c-10 -16 -36 -13 -43 5 -8 22 18 37 36 20 7 -8 10 -19 7
-25z m-731 -142 c0 -7 -8 -15 -17 -17 -18 -3 -25 18 -11 32 10 10 28 1 28 -15z
m575 -5 c0 -14 -21 -19 -33 -7 -9 9 13 34 24 27 5 -3 9 -12 9 -20z m608 3 c2
-10 -3 -17 -12 -17 -18 0 -29 16 -21 31 9 14 29 6 33 -14z m-3380 -30 c3 -31
7 -37 27 -37 20 0 24 6 27 38 2 25 8 37 18 37 12 0 15 -17 15 -95 0 -78 -3
-95 -15 -95 -10 0 -16 13 -18 43 -3 37 -6 42 -27 42 -21 0 -24 -5 -27 -42 -2
-30 -8 -43 -18 -43 -12 0 -16 17 -18 84 -2 46 0 91 3 98 9 26 30 7 33 -30z
m333 6 c-7 -42 -26 -54 -35 -21 -11 44 -7 58 17 58 22 0 23 -3 18 -37z m1719
-48 c0 -79 1 -85 21 -85 33 0 16 -25 -19 -28 l-32 -3 0 86 c0 78 -2 87 -20 92
-32 9 -23 23 15 23 l35 0 0 -85z m1210 79 c0 -19 -114 -194 -126 -194 -19 0
-20 -3 46 108 30 51 60 92 67 92 7 0 13 -3 13 -6z m671 -31 c-7 -42 -26 -54
-35 -21 -11 44 -7 58 17 58 22 0 23 -3 18 -37z m-2753 -1 c2 -16 10 -22 28
-22 15 0 24 -6 24 -15 0 -9 -9 -15 -25 -15 -23 0 -25 -4 -25 -41 0 -41 1 -41
30 -35 35 6 44 -18 10 -29 -46 -14 -80 20 -80 81 0 15 -6 24 -15 24 -8 0 -15
5 -15 10 0 6 7 13 15 16 8 4 15 14 15 23 0 38 33 40 38 3z m1440 0 c2 -16 10
-22 28 -22 15 0 24 -6 24 -15 0 -9 -9 -15 -25 -15 -23 0 -25 -4 -25 -41 0 -41
1 -41 30 -35 35 6 44 -18 10 -29 -46 -14 -80 20 -80 81 0 15 -6 24 -15 24 -8
0 -15 5 -15 10 0 6 7 13 15 16 8 4 15 14 15 23 0 38 33 40 38 3z m-2100 -76
c4 -72 -2 -93 -22 -77 -11 9 -19 9 -34 0 -25 -16 -49 -6 -63 25 -25 55 21 119
81 114 l35 -3 3 -59z m126 58 c30 -11 17 -29 -21 -29 -34 0 -38 -3 -41 -28 -5
-39 15 -60 50 -53 31 6 41 -17 12 -28 -46 -18 -104 20 -104 69 0 49 58 87 104
69z m155 -3 c21 -13 5 -29 -24 -23 -47 9 -73 -39 -39 -73 11 -11 25 -14 45
-10 22 5 29 3 29 -8 0 -9 -13 -18 -31 -22 -69 -15 -117 69 -68 121 23 24 62
31 88 15z m135 -13 c29 -42 21 -58 -29 -58 -47 0 -56 -9 -30 -30 9 -7 26 -9
45 -5 23 5 30 3 30 -8 0 -9 -13 -18 -31 -22 -45 -10 -83 20 -87 68 -6 65 68
105 102 55z m66 12 c0 -7 7 -7 20 0 61 33 102 -55 53 -112 -8 -9 -28 -20 -44
-23 -23 -5 -29 -12 -29 -32 0 -15 -5 -23 -12 -21 -13 5 -24 157 -14 185 6 15
26 18 26 3z m337 -6 c8 -21 -13 -42 -28 -27 -13 13 -5 43 11 43 6 0 13 -7 17
-16z m331 -61 c3 -67 -6 -91 -23 -63 -4 7 -13 6 -26 -1 -26 -14 -58 -2 -69 25
-21 56 26 120 84 114 l31 -3 3 -72z m52 67 c0 -7 7 -7 20 0 61 33 102 -55 53
-112 -8 -9 -28 -20 -44 -23 -23 -5 -29 -12 -29 -32 0 -15 -5 -23 -12 -21 -13
5 -24 157 -14 185 6 15 26 18 26 3z m146 -1 c4 -8 9 -8 17 0 29 29 77 -5 77
-53 0 -42 -23 -72 -59 -79 -20 -4 -30 -13 -33 -28 -2 -12 -9 -24 -15 -27 -10
-3 -13 21 -13 97 0 93 8 119 26 90z m324 -45 c0 -48 3 -57 20 -61 30 -8 18
-28 -16 -28 -28 0 -29 1 -32 58 -2 42 -7 57 -17 57 -8 0 -15 7 -15 15 0 10 10
15 30 15 30 0 30 0 30 -56z m184 50 c30 -11 17 -29 -21 -29 -34 0 -38 -3 -41
-28 -5 -39 15 -60 50 -53 31 6 41 -17 12 -28 -46 -18 -104 20 -104 69 0 49 58
87 104 69z m156 -67 c5 -70 -1 -87 -23 -68 -8 6 -18 6 -27 1 -60 -38 -98 63
-45 116 19 19 34 24 58 22 l32 -3 5 -68z m238 11 c3 -51 6 -58 23 -58 33 0 16
-25 -19 -28 l-32 -3 0 56 c0 48 -3 58 -20 62 -37 10 -20 36 20 31 23 -3 25 -7
28 -60z m182 42 c26 -26 26 -80 0 -108 -43 -46 -110 -13 -110 53 0 42 29 75
65 75 14 0 34 -9 45 -20z m70 11 c0 -5 13 -4 29 2 47 17 63 -3 59 -77 -4 -73
-22 -81 -26 -11 -4 61 -15 75 -42 50 -14 -13 -20 -31 -20 -62 0 -31 -4 -43
-12 -41 -13 5 -24 109 -14 134 6 16 26 19 26 5z m358 -73 c2 -67 0 -80 -18
-98 -13 -13 -31 -20 -47 -18 -39 4 -42 28 -4 28 26 0 31 4 36 33 4 18 5 49 3
68 -2 29 -7 34 -30 37 -52 6 -31 34 22 30 l35 -3 3 -77z m150 65 c2 -9 -8 -13
-32 -13 -46 0 -45 -10 1 -35 46 -25 52 -48 19 -70 -31 -21 -96 -13 -96 11 0
11 9 13 39 8 53 -8 59 9 11 31 -42 19 -53 48 -28 73 16 16 80 11 86 -5z m142
-3 c26 -26 26 -80 0 -108 -43 -46 -110 -13 -110 53 0 42 29 75 65 75 14 0 34
-9 45 -20z m70 11 c0 -5 13 -4 29 2 47 17 63 -3 59 -77 -4 -73 -22 -81 -26
-11 -4 61 -15 75 -42 50 -14 -13 -20 -31 -20 -62 0 -31 -4 -43 -12 -41 -13 5
-24 109 -14 134 6 16 26 19 26 5z m-3810 -56 c0 -11 -12 -15 -50 -15 -38 0
-50 4 -50 15 0 11 12 15 50 15 38 0 50 -4 50 -15z m1407 -51 c8 -21 -13 -42
-28 -27 -13 13 -5 43 11 43 6 0 13 -7 17 -16z"/>
                  <path d="M2276 664 c-19 -18 -21 -45 -4 -62 17 -17 48 14 48 50 0 32 -19 37
-44 12z"/>
                  <path d="M3142 668 c-15 -15 -16 -65 0 -74 16 -10 50 34 46 60 -4 24 -28 32
-46 14z"/>
                  <path d="M5582 718 c-15 -15 -16 -82 -2 -109 23 -42 60 -10 60 51 0 57 -29 87
-58 58z"/>
                  <path d="M6010 701 c0 -31 13 -39 38 -22 21 13 10 46 -16 49 -19 3 -22 -1 -22
-27z"/>
                  <path d="M986 664 c-21 -20 -21 -74 -1 -74 21 0 48 45 40 70 -8 24 -18 25 -39
4z"/>
                  <path d="M1702 668 c-15 -15 -16 -64 -2 -73 19 -12 40 16 40 51 0 35 -16 44
-38 22z"/>
                  <path d="M1847 662 c-21 -23 -23 -72 -3 -72 24 0 47 31 44 58 -4 32 -20 38
-41 14z"/>
                  <path d="M2422 668 c-15 -15 -16 -64 -2 -73 19 -12 40 16 40 51 0 35 -16 44
-38 22z"/>
                  <path d="M2706 658 c-20 -28 -20 -42 -2 -57 20 -17 46 12 46 50 0 35 -22 39
-44 7z"/>
                  <path d="M2990 661 c-13 -26 -13 -44 2 -59 17 -17 48 14 48 50 0 21 -5 28 -20
28 -10 0 -24 -9 -30 -19z"/>
                  <path d="M3717 674 c-14 -14 -6 -24 19 -24 16 0 24 5 22 13 -5 14 -31 21 -41
11z"/>
                  <path d="M4292 668 c-15 -15 -16 -64 -1 -73 17 -11 49 26 49 57 0 30 -25 39
-48 16z"/>
                  <path d="M4437 662 c-20 -22 -23 -72 -4 -72 28 0 49 26 45 55 -4 35 -19 41
-41 17z"/>
                  <path d="M5017 674 c-14 -14 -7 -25 13 -22 12 2 21 8 21 13 0 12 -24 18 -34 9z" />
                  <path d="M982 348 c-15 -15 -16 -64 -2 -73 19 -12 40 16 40 51 0 35 -16 44
-38 22z"/>
                  <path d="M1417 354 c-14 -14 -7 -25 13 -22 12 2 21 8 21 13 0 12 -24 18 -34 9z" />
                  <path d="M1557 342 c-20 -22 -23 -72 -4 -72 28 0 49 26 45 55 -4 35 -19 41
-41 17z"/>
                  <path d="M2132 348 c-15 -15 -16 -64 -1 -73 17 -11 49 26 49 57 0 30 -25 39
-48 16z"/>
                  <path d="M2277 342 c-20 -22 -23 -72 -4 -72 28 0 49 26 45 55 -4 35 -19 41
-41 17z"/>
                  <path d="M2426 344 c-21 -20 -21 -74 -1 -74 21 0 48 45 40 70 -8 24 -18 25
-39 4z"/>
                  <path d="M2990 341 c-13 -26 -13 -44 2 -59 17 -17 48 14 48 50 0 21 -5 28 -20
28 -10 0 -24 -9 -30 -19z"/>
                  <path d="M3420 346 c-15 -19 -9 -56 12 -69 34 -22 66 41 36 71 -16 16 -33 15
-48 -2z"/>
                  <path d="M4140 346 c-15 -19 -9 -56 12 -69 34 -22 66 41 36 71 -16 16 -33 15
-48 -2z"/>
                </g>
              </svg>

            </m.div>
          </div>
        </Card>
      </m.div>
    </LazyMotion>
  );
};