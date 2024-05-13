import type { NextPage } from "next";

import { BottomFooter } from "../components/landing/Footer";
import NavBar from "../components/landing/NavBar";
import { LandingWrapper } from "../components/layout/PageWrapper";

const About: NextPage = () => {
  return (
    <LandingWrapper>
      <div className="background-pattern rounded-b-xl border-x bg-[#F9FBFC]">
        <NavBar />
        <FAQ />
      </div>
      <BottomFooter />
    </LandingWrapper>
  );
};

export const FAQ = ({ removeTitle }: { removeTitle?: boolean }) => (
  <div className="mb-40 mx-auto flex w-11/12 flex-col pb-16 pt-20 md:w-[700px]">
    {!removeTitle && (
      <div className="mb-12 flex justify-center">
        <h1 className="text-6xl font-bold tracking-tight">FAQ</h1>
      </div>
    )}
    <h2 className="mt-4 text-lg font-[550]">What is Adjacent News?</h2>
    <h2 className="mt-4 text-lg">
      Adjacent News let's you read the news with a market lens. We provide a robust RSS reader that allows you to read news from your favorite sources and also see prediction / information markets live. 
    </h2>
  </div>
);

// @ts-ignore
About.theme = "light";

export default About;
