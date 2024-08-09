import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Tilt from "react-parallax-tilt";
import {
  BookmarkFolderCard,
  FullContentCard,
  NotesCard,
  PredictionMarketCard,
  APICard,
} from "./Cards";
import { FilterCard } from "./FilterCard";
import TimeBookmarksCard from "./TimeBookmarksCard";
import SignUpFormReact from "./SignUpForm";
import Banner from "./Banner";
import { PricingPage } from "../../pages/pricing";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="background-pattern border-b border-neutral-200/80 bg-[#fafafa]">
      <main className="z-10 m-5">
        <div className="mt-20">
          <div className="mx-auto max-w-4xl px-5 lg:px-8 xl:max-w-7xl">
            <div className="mx-auto flex flex-col items-center text-center ">
              <div className="z-10">
                <Banner />
              </div>
              <h1 className="z-10 text-[36px] font-[775] leading-none tracking-tight sm:text-[100px] md:text-[100px] lg:w-[900px]">
                <span className="text-black-500">Adjacent News</span>
              </h1>
              <h3 className="z-10 mt-4 text-[16px] font-[400] leading-none tracking-tight sm:text-[24px] md:text-[30px] lg:w-[700px]">
                <span className="text-black-500">
                  Market Driven News
                </span>
              </h3>
              <div className="z-10 mt-6">
                <SignUpFormReact />
              </div>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-1.5">
              <div className="mx-4 grid grid-cols-1 gap-6 md:mx-0 md:grid-cols-2 xl:grid-cols-2">
                <PredictionMarketCard />
                <APICard />
              </div>
            </div>
            <div className="mx-auto mt-4 w-full justify-center px-1.5 sm:flex">
              <div className="mx-4 grid grid-cols-1 gap-6 md:mx-0 md:grid-cols-2 xl:grid-cols-2">
                <BookmarkFolderCard />
                <FullContentCard />
              </div>
            </div>
            <div className="mx-auto mt-4 w-full justify-center px-1.5 sm:flex">
              <div className="mx-4 grid grid-cols-1 gap-6 md:mx-0 lg:grid-cols-2 xl:grid-cols-1">
                <div className="lg:col-span-2">
                  <FilterCard />
                </div>
              </div>
            </div>
            {/* <div className="lg-[2000px] z-10 mt-6 translate-y-12 transform">
              <div
                className="rounded-lg shadow-[0px_0px_50px_100px_rgba(30,161,255,0.02)]"
                onClick={() => {
                  // router.push("/signup");
                  router.push("https://getwaitlist.com/waitlist/16399")
                }}
              >
                <Tilt scale={1.01} tiltMaxAngleY={0} tiltMaxAngleX={1.5}>
                  <Image
                    src="markets.png"
                    alt="Markets"
                    priority
                    width={1920}
                    height={995}
                    unoptimized
                    className="scale-[1.03] transform rounded-lg border border-neutral-200 shadow-[0px_20px_70px_-10px_hsla(227,30%,20%,0.08),0px_10px_24px_-8px_hsla(227,30%,20%,0.04),0px_1px_4px_-1px_hsla(227,30%,20%,0.06)]"
                  />
                </Tilt>
              </div>
            </div> */}
          </div>
          {/* <PricingPage homepage={true}/> */}
        </div>
      </main>
    </div>
  );
}
