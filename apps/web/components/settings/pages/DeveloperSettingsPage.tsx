import { SettingsHeader } from "@components/settings/SettingsHeader";
import { useAtom } from "jotai";

import { Switch } from "@refeed/ui";

import { OpenPortalButton } from "./Account";

import { settingsAtom } from "../../../stores/settings";

import Link from "next/link";

import { fetchPostJSON } from "../../../utils/stripe/api-helpers";
import getStripe from "../../../utils/stripe/get-stripejs";

import { useUser as useSupabaseUser } from "@supabase/auth-helpers-react";
import { useUser } from "@refeed/features/hooks/useUser";


const handleSubmit = async (isYearlyPlan: boolean, userId: string) => {
  // Make sure to change the pricing in trpc as well if you change these
  const price = isYearlyPlan
    ? "price_1Pf2ZvJHM9jR7ebhtz66h3gZ"
    : "price_1Pf2YYJHM9jR7ebhya3E54OF"

  // Create a Checkout Session.
  const response = await fetchPostJSON("/api/payment", {
    price: price,
    userId: userId,
  });

  if (response.statusCode === 500) {
    console.error(response.message);
    return;
  }

  const stripe = await getStripe();
  const { error } = await stripe!.redirectToCheckout({
    sessionId: response.id,
  });
  console.warn(error.message);
};

export const DeveloperSettingsPage = () => {
  const [settings, setSettings] = useAtom(settingsAtom);
  const { plan, api_key } = useUser();
  const user = useSupabaseUser();

  return (
    <div>
      <SettingsHeader
        title="Developer Settings"
        subtitle="Developer Settings Page"
      />
      <div className="flex w-full items-start">
        <div className="flex w-full flex-col">
          <h4 className="text-sm leading-5 text-neutral-450 dark:text-stone-500">
            This is the developer settings page. You can use your API key for a variety of products like Chrome Extension
          </h4>
        </div>
      </div>
      <div className="mt-6 flex w-full items-start">
        <div className="flex flex-col">
          <h1 className="mb-1 select-none text-sm font-medium leading-5">
            API Key
          </h1>
          <h4 className="select-none text-sm leading-5 text-neutral-450 dark:text-stone-500">
            {plan === 'pro' ? api_key : 
              <div>
                <p>You need to be on the Pro plan to access this feature.</p>
                <button
                  onClick={() => {
                    handleSubmit(false, user?.id!);
                  }}
                  className="mt-2 select-none text-sm font-medium leading-5 text-sky-500/95"
                >
                  Upgrade -&gt;{" "}
                </button>
              </div>
            }
          </h4>
        </div>
      </div>
      {/* <div className="mt-6 flex w-full items-start">
        <div className="flex flex-col">
          <h1 className="mb-1 select-none text-sm font-medium leading-5">
            Enabled Newsletters
          </h1>
          <h4 className="select-none text-sm leading-5 text-neutral-450 dark:text-stone-500">
            Enabled the Newsletters feature
          </h4>
        </div>
        <Switch
          className="ml-auto mr-12 mt-3"
          checked={settings.flagEnableNewsleters}
          onCheckedChange={() => {
            setSettings({
              ...settings,
              flagEnableNewsleters: !settings.flagEnableNewsleters,
            });
          }}
          id="airplane-mode"
        />
      </div> */}
      {/* <div className="mt-6 flex w-full items-start">
        <div className="flex flex-col">
          <h1 className="mb-1 select-none text-sm font-medium leading-5">
            Experimental Highlighting
          </h1>
          <h4 className="select-none text-sm leading-5 text-neutral-450 dark:text-stone-500">
            This fully does not work yet
          </h4>
        </div>
        <Switch
          className="ml-auto mr-12 mt-3"
          checked={settings.flagEnableNewsleters}
          onCheckedChange={() => {
            setSettings({
              ...settings,
              flagEnableNewsleters: !settings.flagEnableNewsleters,
            });
          }}
          id="airplane-mode"
        />
      </div> */}
    </div>
  );
};
