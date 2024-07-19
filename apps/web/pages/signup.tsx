import { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";

import { LandingWrapper } from "../components/layout/PageWrapper";
import { EmailButton } from "../features/auth/EmailButton";
import { GoogleButton } from "../features/auth/GoogleLoginButton";

function Signup() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const inviteCodes = [
    "dreamy_goldberg",
    "trusting_bhaskara",
    "inspiring_liskov",
    "sharp_easley",
    "amazing_almeida",
    "dazzling_kepler",
    "tender_easley",
    "dreamy_leavitt",
    "keen_ptolemy",
    "quizzical_gates",
    "dreamy_goldstine",
    "admiring_wozniak",
    "ecstatic_carson",
    "sharp_fermi",
    "priceless_hugle",
    "tender_galileo",
    "optimistic_hermann",
    "compassionate_tesla",
    "eager_agnesi",
    "wizardly_kowalevski",
    "brave_darwin",
    "stupefied_torvalds",
    "nifty_tesla",
    "reverent_kowalevski",
    "gallant_jennings",
    "dreamy_shannon",
    "blissful_poincare",
    "thirsty_allen",
    "eager_bartik",
    "dreamy_lichterman",
    "xenodochial_johnson",
    "sad_lamarr",
    "keen_mayer",
    "awesome_hamilton",
    "trusting_dijkstra",
    "unruffled_wozniak",
    "happy_panini",
    "festive_jang",
    "gallant_shaw",
    "loving_colden",
    "adoring_kilby",
    "nervous_payne",
    "determined_varahamihira",
    "sharp_jackson",
    "condescending_allen",
    "jovial_hamilton",
    "unruffled_spence",
    "magical_fermat",
    "epic_bartik",
    "modest_pare",
  ];

  const verifyCode = () => {
    if (inviteCodes.includes(inviteCode)) {
      setCodeVerified(true);
      setCodeError(false);
    } else {
      setCodeError(true);
      setInviteCode('');
    }
  };

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

          {!codeVerified && (
            <>
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Enter Invite Code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className={`flex-1 rounded-l-md border px-4 py-2 text-neutral-900 focus:outline-none ${codeError ? 'border-red-500' : 'border-neutral-300 focus:border-blue-500'}`}
                />
                <button
                  onClick={verifyCode}
                  className="rounded-r-md bg-blue-500 px-4 py-2 text-white"
                >
                  Enter
                </button>
              </div>
              {codeError && <p className="text-red-500">Wrong code</p>}
            </>
          )}

          {codeVerified && (
            <>
              <GoogleButton />
              <EmailButton type="signup" />
            </>
          )}

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