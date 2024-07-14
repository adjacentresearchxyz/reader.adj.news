import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FeedLayout } from "@components/feed/FeedLayout";
import NavBar from "@components/layout/NavBar";
import SideBar from "@components/layout/SideBar";
import { useAtomValue } from "jotai";

import { titleAtom } from "@refeed/atoms/feedsAtom";

import CommandPalette from "../../../components/cmdk/CommandPalette";
import { PageWrapper } from "../../../components/layout/PageWrapper";
import Reader from "../../../components/reader/Reader";
import { useFeedsInFolders } from "../../../features/folders/useFeedsInFolders";
import { useUser } from "@supabase/auth-helpers-react";

const Feed: NextPage = () => {
  const { query } = useRouter();
  const { feedId } = query;

  const { feedsInFolders } = useFeedsInFolders();

  let title;
  if (feedsInFolders) {
    for (const folder of feedsInFolders) {
      if (folder.children) {
        for (const feed of folder.children) {
          if (feed.id === feedId) {
            title = feed.name;
          }
        }
      }
    }
  }

  const check = useAtomValue(titleAtom);
  if (check) {
    title = check;
  }

  const user = useUser()

  return (
    <PageWrapper>
      <CommandPalette />
      {user && <SideBar />}
      <div
        className={`flex h-screen w-full flex-col overflow-hidden bg-white dark:bg-[#0f0f10]`}
      >
        <Reader />
        <NavBar title={title ?? ""} />
        <FeedLayout FeedType="one" feedId={(feedId as string) || ""} />
      </div>
    </PageWrapper>
  );
};

export default Feed;
