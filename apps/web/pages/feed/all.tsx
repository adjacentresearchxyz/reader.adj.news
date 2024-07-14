import type { NextPage } from "next";
import { FeedLayout } from "@components/feed/FeedLayout";
import SideBar from "@components/layout/SideBar";

import CommandPalette from "../../components/cmdk/CommandPalette";
import NavBar from "../../components/layout/NavBar";
import { PageWrapper } from "../../components/layout/PageWrapper";
import Reader from "../../components/reader/Reader";
import { useUser } from "@supabase/auth-helpers-react";

const All: NextPage = () => {
  const user = useUser()

  return (
    <PageWrapper>
      <CommandPalette />
      {user && <SideBar />}
      <div className={`flex h-screen w-full flex-col`}>
        <Reader />
        <NavBar title="All Feeds" />
        <FeedLayout FeedType="all" />
      </div>
    </PageWrapper>
  );
};

export default All;
