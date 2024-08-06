import type { NextPage } from "next";

import { BottomFooter } from "../components/landing/Footer";
import NavBar from "../components/landing/NavBar";
import { LandingWrapper } from "../components/layout/PageWrapper";

const About: NextPage = () => {
  return (
    <LandingWrapper>
      <div className="mb-40 background-pattern rounded-b-xl border-x bg-[#F9FBFC]">
        <NavBar />
        <FAQ />
      </div>
      <BottomFooter />
    </LandingWrapper>
  );
};

export const FAQ = ({ removeTitle }: { removeTitle?: boolean }) => (
  <div className="mx-auto flex w-11/12 flex-col pb-16 pt-20 md:w-[700px]">
    {!removeTitle && (
      <div className="mb-12 flex justify-center">
        <h1 className="text-6xl font-bold tracking-tight">Opensource</h1>
      </div>
    )}
    <h2 className="mt-4 text-lg font-[550]">We use a significant number of open-source libraries and frameworks. Listed below</h2>
    <ul className="mx-2 mt-2 flex flex-col list-disc list-inside">
      <li className="py-[3px] text-lg dark:text-stone-200">
        <a href="https://github.com/michaelkremenetsky/Refeed" className="underline-dotted" target="_blank">Refeed</a>
      </li>
      <li className="py-[3px] text-lg dark:text-stone-200">
        <a href="https://observablehq.com/framework" className="underline-dotted" target="_blank">Observable Framework</a>
      </li>
      <li className="py-[3px] text-lg dark:text-stone-200">
        <a href="https://thegraph.com/" className="underline-dotted" target="_blank">The Graph</a>
      </li>
      <li className="py-[3px] text-lg dark:text-stone-200">
        <a href="https://nextjs.org/" className="underline-dotted" target="_blank">Next.js</a>
      </li>
      <li className="py-[3px] text-lg dark:text-stone-200">
        <a href="https://trpc.io/" className="underline-dotted" target="_blank">tRPC</a>
      </li>
      <li className="py-[3px] text-lg dark:text-stone-200">
        <a href="https://reactjs.org/" className="underline-dotted" target="_blank">React</a>
      </li>
      <li className="py-[3px] text-lg dark:text-stone-200">
        <a href="https://tailwindcss.com/" className="underline-dotted" target="_blank">Tailwind CSS</a>
      </li>
      <li className="py-[3px] text-lg dark:text-stone-200">
        <a href="https://prisma.io/" className="underline-dotted" target="_blank">Prisma</a>
      </li>
      <li className="py-[3px] text-lg dark:text-stone-200">
        <a href="https://turborepo.org/" className="underline-dotted" target="_blank">Turborepo</a>
      </li>
      <li className="py-[3px] text-lg dark:text-stone-200">
        <a href="https://supabase.com/" className="underline-dotted" target="_blank">Supabase</a>
      </li>
    </ul>
    <br />
    <h2>We are also fully open-source, you can find our repositories at <a href="https://github.com/orgs/adjacentresearchxyz/repositories?q=adjacent-news" className="py-[3px] text-lg dark:text-stone-200 underline-dotted">github.com/adjacentresearchxyz</a></h2>
  </div>
);

// @ts-ignore
About.theme = "light";

export default About;
