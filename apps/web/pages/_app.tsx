import "styles/cmdk.scss";
import "styles/globals.css";

import { StrictMode, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import {
  NEXT_PUBLIC_POSTHOG_HOST,
  NEXT_PUBLIC_POSTHOG_KEY,
} from "@utils/posthog";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "next-themes";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { trpc } from "utils/trpc";
import { getFirstParagraphs } from "@lib/getFirstParagraph";

import { Toaster } from "@refeed/ui";

import type { ItemType } from "@refeed/types/item";

if (typeof window !== "undefined") {
  if (NEXT_PUBLIC_POSTHOG_KEY && NEXT_PUBLIC_POSTHOG_HOST) {
    posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
      enable_recording_console_log: true,
    });
  }
}

const App = ({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session | null }>) => {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const router = useRouter();

  const { item: urlItem } = router.query;
  
  const [item, setItem] = useState<ItemType | null>(null);

  useEffect(() => {
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    if (urlItem) {
      supabase.from("item").select("*").eq("id", urlItem).then((res) => {
        if (res.data) {
          setItem(res.data[0]);
        }
      });
    } else {
      setItem(null);
    }
  }, [urlItem]);

  return (
    <PostHogProvider client={posthog}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <JotaiProvider>
          <StrictMode>
            <Head>
              {/* Primary */}
              <title>{item ? item.title : 'Adjacent News'}</title>
              <meta name="description" content={"Prediction Market Driven News"} />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              ></meta>

              {/* Mobile */}
              <link rel="icon" href="/favicon.ico" />
              <link rel="apple-touch-icon" href="/favicon.ico" />
              
              {/* Open Graph */}
              <meta property="og:title" content={item ? item.title : 'Adjacent News'} />
              {/* <meta property="og:url" content= /> */}
              <meta property="og:description" content="Prediction Market Driven News" />
              <meta property="og:image" content={item ? `https://fyeyeurwgxklumxgpcgz.supabase.co/functions/v1/og-image?id=${item.id}` : 'https://adj.news/logo.svg'} />

              {/* Twitter */}
              <meta property="twitter:card" content="summary_large_image" />
              {/* <meta property="twitter:url" content="https://adj.news/feed/all?item=clygk5cyd071vmc07glrelii2" /> */}
              <meta property="twitter:title" content={item ? item.title : 'Adjacent News'} />
              <meta property="twitter:description" content="Prediction Market Driven News" />
              <meta property="twitter:image" content={item ? `https://fyeyeurwgxklumxgpcgz.supabase.co/functions/v1/og-image?id=${item.id}` : 'https://adj.news/logo.svg'} />
            </Head>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              // @ts-ignore
              forcedTheme={Component.theme}
            >
              <main
                className={`bg-background text-optimize-legibility min-h-screen text-[#38383d] subpixel-antialiased outline-none dark:bg-[#0f0f10] dark:text-[#f3f3f7]`}
              >
                <Component className={`dark`} {...pageProps} />
                <Toaster position="bottom-right" />
              </main>
            </ThemeProvider>
          </StrictMode>
        </JotaiProvider>
      </SessionContextProvider>
    </PostHogProvider>
  );
};

export default trpc.withTRPC(App);
