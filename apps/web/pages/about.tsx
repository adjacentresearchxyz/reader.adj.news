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
        <h1 className="text-6xl font-bold tracking-tight">Adjacent News</h1>
      </div>
    )}
    <p className="mt-4 text-lg">
      We are building a prediction market data platform (
        <a href="https://x.com/0xperp/status/1799294808311345517" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
        over 35k markets and growing
      </a>
      ) alongside a robust {" "}
      <a href="https://www.notion.so/Adjacent-News-One-Pager-0bfbded391c146059029edc9bb3f656c?pvs=21" style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
        RSS news reader
      </a>. 
    </p>
    <p className="mt-4 text-lg">
      Prediction markets struggle for a few reasons:
    </p>
    <ul className="list-disc pl-5">
      <li>Discovery</li>
      <li>Oracles / Settlement Criteria</li>
      <li>Long Bets</li>
      <li>Liquidity</li>
    </ul>
    <p className="mt-4 text-lg">
      But are very beneficial for forward looking news, they successfully beat or were the first to predict:
    </p>
    <ul className="list-disc pl-5">
      <li>
        <a href="https://blakelaw.dev/portfolio/predicting-the-fed/" style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
          Fed Rates
        </a>
      </li>
      <li>
        <a href="https://pandemic.metaculus.com" style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
          COVID-19
        </a>
      </li>
      <li>
        <a href="https://polymarket.com/elections" style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
          and of course elections
        </a>
      </li>
    </ul>
    <p className="mt-4 text-lg">
      We are solving the discovery problem by highlighting forward looking markets alongside current news.
    </p>
  </div>
);

// @ts-ignore
About.theme = "light";

export default About;
