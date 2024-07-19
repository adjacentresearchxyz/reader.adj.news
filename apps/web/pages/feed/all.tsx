import type { NextPage } from "next";
import { FeedLayout } from "@components/feed/FeedLayout";
import SideBar from "@components/layout/SideBar";

import CommandPalette from "../../components/cmdk/CommandPalette";
import NavBar from "../../components/layout/NavBar";
import { PageWrapper } from "../../components/layout/PageWrapper";
import Reader from "../../components/reader/Reader";
import { useUser } from "@supabase/auth-helpers-react";

import { SEO } from "../../components/seo/SEO";

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

const All: NextPage<{ title: string; description: string, id: string }> = ({ title, description, id }) => {
  const user = useUser()

  return (
    <PageWrapper>
      <SEO title={title} description={description} id={id}/>
      <CommandPalette />
      <SideBar />
      <div className={`flex h-screen w-full flex-col`}>
        <Reader />
        <NavBar title="All Feeds" />
        <FeedLayout FeedType="all" />
      </div>
    </PageWrapper>
  );
};

export default All;
