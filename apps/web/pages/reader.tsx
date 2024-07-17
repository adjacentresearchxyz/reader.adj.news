import { NextPage } from "next";
import { PageWrapper } from "@components/layout/PageWrapper";
import Reader from "../components/reader/OpenReader";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { SEO } from "../components/seo/SEO";

export async function getServerSideProps(context: any) {
    // Extract the ID from the query parameters
    const { item } = context.query;

    // Define the base URL for the API
    const baseUrl = 'https://hyperdrive-adjacent-news.adjacentresearch.workers.dev/';

    let rowItem = {};

    if (item) {
        try {
            // Fetch data from the API using the ID
            const response = await fetch(`${baseUrl}?id=${item}`);
            const data = await response.json();

            // If the API returns a result, update title and description
            if (data.result && data.result.length > 0) {
                rowItem = data.result;
                rowItem = rowItem[0];

                // Decode HTML entities in website_content
                if (rowItem && rowItem.website_content) {
                    rowItem.website_content = NodeHtmlMarkdown.translate(rowItem.website_content ?? "", );
                }
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    return {
        props: {
            item: rowItem ?? null,
        },
    };
}

const OpenReaderPage: NextPage<{ item }> = ({ item }) => {
    return (
        <PageWrapper>
            <SEO title={item.title} description={item.description} id={item.id}/>
            <Reader item={item} />
        </PageWrapper>
    );
}

export default OpenReaderPage;
