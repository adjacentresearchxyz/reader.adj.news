import "styles/cmdk.scss";
import "styles/globals.css";

import { StrictMode, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from "next/router";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "next-themes";
import posthog from "posthog-js";
import {
  NEXT_PUBLIC_POSTHOG_HOST,
  NEXT_PUBLIC_POSTHOG_KEY,
} from "@utils/posthog";
import { PostHogProvider } from "posthog-js/react";
import { useUser } from "@supabase/auth-helpers-react";

import { trpc } from "utils/trpc";

import { Toaster } from "@refeed/ui";

if (typeof window !== 'undefined') { // checks that we are client-side
  posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'always',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
    },
  })
}

const App = ({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session | null }>) => {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const router = useRouter();
  const user = useUser();

  if (user) {
    posthog.identify(
      user.id
    );
  }

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture('$pageview')
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

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
              <title>{'Adjacent News'}</title>
              <meta name="description" content={"Prediction Market Driven News"} />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              ></meta>

              {/* Mobile */}
              <link rel="icon" href="/favicon.ico" />
              <link rel="apple-touch-icon" href="/favicon.ico" />
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
