import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { BottomFooter } from "@components/landing/Footer";
import Tilt from "react-parallax-tilt";

import type { EventFor } from "@refeed/lib/EventFor";
import { Input } from "@refeed/ui";

import NavBar from "../../components/landing/NavBar";
import { LandingWrapper } from "../../components/layout/PageWrapper";

const Youtube: NextPage = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [finalLink, setFinalLink] = useState<string | null>(null);

  return (
    <LandingWrapper>
      <div className="overflow-hidden bg-[#FCFCFC]" style={{ minHeight: "70vh" }}>
        <div className="z-10 rounded-b-xl pt-5">
          <NavBar />
        </div>
        <Head>
          <title>Youtube RSS Link Generator</title>
        </Head>
        <div className=" bg-[#FCFCFC]">
          <div className="pb-20" />
          <div className="flex justify-center">
            <div className="w-[500px] rounded-lg">
              <div className="mb-12 flex flex-col">
                <h1 className="text-center text-4xl font-bold">
                  Youtube RSS Link Generator
                </h1>
                <h2 className="mx-2 mt-5 text-center text-neutral-450 sm:mx-0">
                  Create RSS feeds from any YouTube Channel. Just copy and paste
                  the YouTube channel @ below to get started.
                </h2>
              </div>
              <div className="flex justify-center sm:justify-normal">
                <Input
                  placeholder="Type a Youtube channel @"
                  className="mb-0.5 h-11 w-[200px] bg-white placeholder:text-neutral-400 sm:w-[330px]"
                  defaultValue={query ?? ""}
                  onInput={(e: EventFor<"input", "onChange">) => {
                    if (!e.target.value) {
                      setQuery(null);
                    } else {
                      setQuery(e.target.value ?? "");
                    }
                  }}
                />
                <button
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={async () => {
                    const response = await fetch(
                      `/api/youtube/chaneelIdByAt?handle=${encodeURIComponent(query!)}`,
                    );

                    const link = await response.json();

                    setFinalLink(link.channelId);
                  }}
                  className="ml-2 h-11 rounded-md bg-white px-6 py-2 text-base font-medium shadow-[0_0_0_1px_rgba(18,55,105,0.08),0_1px_2px_0_rgba(18,55,105,0.12)]"
                >
                  Get RSS Link
                </button>
              </div>
              {finalLink && (
                <div className="mt-5 flex justify-center">
                  <h1 className="text-neutral-450">
                    RSS Link:{" "}
                    {finalLink && (
                      <>
                        {"https://www.youtube.com/feeds/videos.xml?channel_id=" +
                          finalLink}
                      </>
                    )}
                    <Link href="/signup" className="text-sky-500">
                      {" "}
                      <br /><br />Add to Reader
                    </Link>
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "auto" }}>
        <BottomFooter />
      </div>
    </LandingWrapper>
  );
};

// @ts-ignore
Youtube.theme = "light";

export default Youtube;
