import { useEffect, useState } from "react";
import { PricingPage } from "@components/upgrade/PricingPage";
import * as Dialog from "@radix-ui/react-dialog";
import { useUser as useSupabaseUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Drawer } from "vaul";

import { useUser } from "@refeed/features/hooks/useUser";

import {
  calculateRemainingTime,
  fetchTrialEndBySubscriptionId,
} from "../../../features/payments/trail";
import { DeleteAccount } from "../../dialog/DeleteAccountDialog";
import { SettingsHeader } from "../SettingsHeader";

const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const AccountSettingsPage = () => {
  const user = useSupabaseUser();
  const { data, plan } = useUser();

  const adjectives = [
    "dreamy", "trusting", "inspiring", "sharp", "amazing", "dazzling", "tender", "keen", "quizzical", "admiring", "ecstatic", "priceless", "optimistic", "compassionate", "eager", "wizardly", "brave", "stupefied", "nifty"
  ];
  
  const nouns = [
    "goldberg", "bhaskara", "liskov", "easley", "almeida", "kepler", "leavitt", "ptolemy", "gates", "goldstine", "wozniak", "carson", "fermi", "hugle", "galileo", "hermann", "tesla", "agnesi", "kowalevski", "darwin", "torvalds"
  ];
  
  const convertUserIdToWords = (userId) => {
    const hash = simpleHash(userId);
    const adjective = adjectives[hash % adjectives.length];
    const noun = nouns[hash % nouns.length];
    return `${adjective}_${noun}`;
  };
  
  const { data: trialEnd } = useQuery({
    queryKey: ["subscriptionTrialEnd", data?.stripeSubscriptionId],
    queryFn: async () => {
      const trailData = await fetchTrialEndBySubscriptionId(
        data?.stripeSubscriptionId!,
      );
      return trailData;
    },
  });

  const remainingHours = calculateRemainingTime(trialEnd!);

  const [userInviteCodes, setUserInviteCodes] = useState([]);

  useEffect(() => {
    if (user?.id) {
      const userWords = convertUserIdToWords(user?.id!);
      setUserInviteCodes([userWords]);
    }
  }, [user?.id]);

  return (
    <div>
      <SettingsHeader title="Account" subtitle="Manage Account Info" />
      <div className="mt-6 flex rounded-lg pb-2">
        <div className="mt-0.5 flex h-[1.7rem] w-[1.7rem] select-none items-center justify-center rounded-[4px] bg-[#0496FF]/10 pt-0.5 text-xs font-normal">
          <h4 className="font-medium text-sky-500">M</h4>
        </div>
        <div className="flex flex-col pl-[1px]">
          <h4 className="select-none pl-1.5 text-[13.25px] font-[500] leading-4 dark:text-stone-200">
            {user?.user_metadata.full_name ?? user?.email}
          </h4>
          <h4 className="truncate pl-1.5 text-[11px] font-[500] leading-4 text-neutral-450 dark:text-[#F3F5F7]/50">
            {user?.email}
          </h4>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <div className="flex w-full items-start">
          <div className="flex flex-col">
            <h1 className="mb-1 select-none text-sm font-medium leading-5">
              Current Plan
            </h1>
            <h4 className="flex select-none flex-col text-sm leading-5 text-neutral-450 dark:text-stone-500">
              {plan == "free"
                ? "You are currently on the Free plan"
                : "You are currently on the Pro plan"}
              <div className="mt-1">
                {trialEnd && remainingHours != 0 && plan == "pro" && (
                  <span className="text-sky-500/95">
                    {" "}
                    {remainingHours > 24 ? (
                      <div>
                        You have {Math.round(remainingHours / 24)} days left on
                        your trial
                      </div>
                    ) : (
                      <div>
                        You have {remainingHours.toFixed(0)} hours left on your
                        trial
                      </div>
                    )}
                  </span>
                )}
              </div>
            </h4>
            <Dialog.Root>
              <Drawer.Root direction="right" shouldScaleBackground>
                {plan == "free" && (
                  <Drawer.Trigger className="mt-1 -translate-x-[22px] transform cursor-pointer select-none text-sm font-medium leading-5 text-sky-500/95">
                    View plans and upgrade →
                  </Drawer.Trigger>
                )}
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
                  <Drawer.Content className="fixed bottom-0 right-0 z-50 mt-24 flex h-full w-[1000px] flex-col overflow-scroll overflow-x-hidden rounded-t-[10px] bg-zinc-100">
                    <PricingPage />
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </Dialog.Root>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <div className="flex w-full items-start">
          <div className="flex flex-col">
            <h1 className="mb-2 select-none text-sm font-medium leading-5">
              Billing
            </h1>
            <h4 className="select-none text-sm leading-5 text-neutral-450 dark:text-stone-500">
              {plan == "free"
                ? "You don't have a subscription yet"
                : "Manage your current subscription"}
            </h4>
            <div className="mt-1">
              {plan != "free" && <OpenPortalButton userId={user?.id!} />}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <div className="flex w-full items-start">
          <div className="flex flex-col">
            <h1 className="mb-1 select-none text-sm font-medium leading-5">
              Invite Codes
            </h1>
            <div className="mt-1">
              {userInviteCodes.length > 0 ? (
                <ul>
                  {userInviteCodes.map((code, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm leading-5 text-neutral-450 dark:text-stone-500">
                      {code}
                    </li>
                  ))}
                </ul>
              ) : (
                <h1 className="text-sm leading-5 text-neutral-450 dark:text-stone-500">
                  You have 0 invite codes
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <div className="flex w-full items-start">
          <div className="flex flex-col">
            <h1 className="mb-1 select-none text-sm font-medium leading-5">
              Contact Support
            </h1>
            <div className="mt-1">
              <h1 className="text-sm leading-5 text-neutral-450 dark:text-stone-500">
                Email us at lucas@adjacentresearch.xyz
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <DeleteAccount />
      </div>
    </div>
  );
};

const OpenPortalButton = ({ userId }: { userId: string }) => {
  const openStripeBillingPortal = async () => {
    try {
      const response = await fetch("/api/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("There was an error opening the billing link:", error);
    }
  };

  return (
    <button
      onClick={() => {
        openStripeBillingPortal();
      }}
      className="mt-1 select-none text-sm font-medium leading-5 text-sky-500/95"
    >
      Manage Subscription
    </button>
  );
};
