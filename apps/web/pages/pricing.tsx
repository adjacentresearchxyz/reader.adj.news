import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";

import { PricingBackground } from "../components/landing/Background";
import {
  BottomFooter,
  EmptyMessageSvgForFooter,
} from "../components/landing/Footer";
import NavBar from "../components/landing/NavBar";
import { LandingWrapper } from "../components/layout/PageWrapper";
import { FreePlan, ProPlan } from "../features/pricing/PricingDialog";
import { FAQ } from "./about";

const Pricing: NextPage = () => {
  return (
    <LandingWrapper>
      <PricingPage />
    </LandingWrapper>
  );
};

export const PricingPage = ({ homepage = false }: { homepage?: boolean } = {}) => {
  const [isYearlyPlan, setIsYearlyPlan] = useState(false);

  // Background pattern is not supported in Safari so we remove it
  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <>
      <div className="background-pattern rounded-b-xl border-b bg-[#FAFBFC]">
        {!isSafari && !homepage && <PricingBackground />}
        {!homepage && <NavBar />}
        {!homepage && <h1 className="mx-auto mb-1 mt-20 flex justify-center text-7xl font-[750] leading-none tracking-tighter md:w-[700px]">
          <span className="z-10 py-2 tracking-tight text-black-500">Pricing</span>
        </h1>}
        <div className="mt-5 flex items-center justify-center">
          <Control
            isYearlyPlan={isYearlyPlan}
            setIsYearlyPlan={setIsYearlyPlan}
          />
        </div>
        <div className="mb-20 mt-8 flex justify-center">
          <div className="z-10 flex flex-col gap-x-4 gap-y-4 rounded-lg md:flex-row md:gap-y-0">
            <FreePlan className="border border-neutral-300/80 sm:w-[375px]" />
            <ProPlan className="sm:w-[375px]" isYearlyPlan={isYearlyPlan} />
          </div>
        </div>
      </div>
      {!homepage && <BottomFooter />}
    </>
  );
};

export const Control = ({
  isYearlyPlan,
  setIsYearlyPlan,
}: {
  isYearlyPlan: boolean;
  setIsYearlyPlan: (isYearlyPlan: boolean) => void;
}) => {
  return (
    <div
      dir="ltr"
      data-orientation="horizontal"
      className="flex rounded-md border bg-neutral-100 dark:border-[#24252A] dark:bg-[#141415]"
    >
      <button onClick={() => setIsYearlyPlan(false)} className="rounded-sm">
        <h2
          className={`${!isYearlyPlan ? "border border-neutral-200 bg-white font-medium text-[#242628] shadow-[rgba(0,0,0,0.05)_0px_0px_1px,rgba(0,0,0,0.04)_0px_15px_30px] dark:border-neutral-700 dark:bg-[#0f0f10] dark:text-stone-200" : "text-neutral-500"} w-full rounded-[6px] px-3 py-[2px]`}
        >
          Monthly
        </h2>
      </button>
      <button onClick={() => setIsYearlyPlan(true)} className="rounded-sm">
        <h2
          className={`${isYearlyPlan ? "border border-neutral-200 bg-white font-medium text-[#242628] shadow-[rgba(0,0,0,0.05)_0px_0px_1px,rgba(0,0,0,0.04)_0px_15px_30px] dark:border-neutral-700 dark:bg-[#0f0f10] dark:text-stone-200" : "text-neutral-500"} w-full rounded-[6px] px-3 py-[2px]`}
        >
          Yearly
        </h2>
      </button>
    </div>
  );
};

// @ts-ignore
Pricing.theme = "light";

export default Pricing;
