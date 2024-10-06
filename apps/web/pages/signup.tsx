import { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";

import { LandingWrapper } from "../components/layout/PageWrapper";
import { EmailButton } from "../features/auth/EmailButton";
import { GoogleButton } from "../features/auth/GoogleLoginButton";

function Signup() {
  const router = useRouter();
  const { query } = useRouter();
  const isGhost = query.ghost === 'true';

  return (
    <LandingWrapper>
      <div className="flex h-screen bg-[#FCFCFC] text-neutral-900">
        <div className="mx-auto flex w-[325px] flex-col items-center justify-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight">Sign Up</h1>
          <div className="mb-2 flex text-sm font-medium">
            <h3 className="mr-1">Already have an Account?</h3>
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="text-neutral-400 dark:text-stone-400"
            >
              Login
            </button>
          </div>

          <GoogleButton ghost={isGhost}/>
          <EmailButton ghost={isGhost} type="login" />

          <h3 className="pt-1 text-center text-[13px] text-neutral-500">
            By clicking “Continue” above, you acknowledge that you have read and
            understood, and agree to Adjacent's{" "}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>.
          </h3>
          <h5 className="pt-1 text-center text-[13px] text-neutral-500">
            <Link href="/" className="underline">
              Adjacent News
            </Link>
          </h5>
        </div>
      </div>
    </LandingWrapper>
  );
}

Signup.theme = "light";
export default Signup;