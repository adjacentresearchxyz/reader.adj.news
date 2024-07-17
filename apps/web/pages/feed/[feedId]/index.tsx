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
import { SEO } from "../../../components/seo/SEO";

export async function getServerSideProps(context: any) {
  // Extract the ID from the query parameters
  const { item } = context.query;

  // Define the base URL for the API
  const baseUrl = 'https://hyperdrive-adjacent-news.adjacentresearch.workers.dev/';

  // Initialize default values for title and description
  let title = 'Adjacent News';
  let description = 'News Adjacent to Prediction Markets';

  if (item) {
    try {
      // Fetch data from the API using the ID
      const response = await fetch(`${baseUrl}?id=${item}`);
      const data = await response.json();

      // If the API returns a result, update title and description
      if (data.result && data.result.length > 0) {
        title = data.result[0].title;
        description = data.result[0].website_content;
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  // Return the title, description, and id as props
  return {
    props: {
      title,
      description,
      id: item ?? null,
    },
  };
}

const Feed: NextPage<{ title: string; description: string, id: string }> = ({ item_title, description, id }) => {
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

  return (
    <PageWrapper>
      <SEO title={item_title} description={description} id={id}/>
      <CommandPalette />
      <SideBar />
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
