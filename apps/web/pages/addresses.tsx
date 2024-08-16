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
        <h1 className="text-6xl font-bold tracking-tight">Donation Addresses</h1>
      </div>
    )}
    <h2 className="mt-4 text-lg font-[550]">If you would like to donate digital assets to us you can at the following addresses</h2>
    <p>EVM: <code>0x97e55DF556254dDB9298ABB16307c5C378b74CcA</code></p>
    <p>BTC: <code>bc1qpnk8r9pt20kskhfra45flurezz8f8mhydjljpe</code></p>  
    <p>SOL: <code>GjXhukrcFh5z53cCDFWYCKyqjRgtFdrCsVy1Rshtk5P4</code></p>
  </div>
);

// @ts-ignore
About.theme = "light";

export default About;
