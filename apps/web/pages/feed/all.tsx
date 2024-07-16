import type { NextPage } from "next";
import { FeedLayout } from "@components/feed/FeedLayout";
import SideBar from "@components/layout/SideBar";

import CommandPalette from "../../components/cmdk/CommandPalette";
import NavBar from "../../components/layout/NavBar";
import { PageWrapper } from "../../components/layout/PageWrapper";
import Reader from "../../components/reader/Reader";
import { useUser } from "@supabase/auth-helpers-react";

import { SEO } from "../../components/seo/SEO";

export async function getServerSideProps() {
  // Fetch your data or define your SEO content here
  const title = 'Test Title';
  const description = 'Test Description';

  // @TODO check to see if theres an id, fetch from DB and render the metadata

  return {
    props: {
      title,
      description,
    },
  };
}

const All: NextPage<{ title: string; description: string }> = ({ title, description }) => {
  const user = useUser()

  return (
    <PageWrapper>
      <SEO title={title} description={description} />
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
