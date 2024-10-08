import { useEffect } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { trpc } from "../../utils/trpc";

export const GoogleButton = (props: { ghost: true | false }) => {
  const Supabase = useSupabaseClient();
  const utils = trpc.useUtils();
  const origin =
    typeof window !== "undefined" ?? window.location.origin
      ? window.location.origin
      : "";

  const user = useUser();

  useEffect(() => {
    if (user) {
      location.reload();
    }
  }, [user]);

  const SignInWithGoogle = async () => {
    const { error } = await Supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: props.ghost ? origin + "/redirect" : origin + "/login",
      },
    });

    if (error) alert(error.message);

    utils.invalidate();
  };

  return (
    <button
      className="w-full rounded-[6px] bg-white px-4 py-2.5 text-base font-medium no-underline shadow-[0_0_0_1px_rgba(18,55,105,0.08),0_1px_2px_0_rgba(18,55,105,0.12)] transition hover:bg-[#fafafa]"
      onClick={() => {
        SignInWithGoogle();
      }}
    >
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5"
          viewBox="0 0 186.69 190.5"
        >
          <path
            fill="#4285f4"
            d="M95.25 77.932v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
          />
          <path
            fill="#34a853"
            d="m41.869 113.38-6.972 5.337-24.679 19.223c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
          />
          <path
            fill="#fbbc05"
            d="M10.218 52.561C3.724 65.376.001 79.837.001 95.25s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
          />
          <path
            fill="#ea4335"
            d="M95.25 37.927c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276C142.442 9.439 120.968 0 95.25 0 58.016 0 25.891 21.388 10.218 52.561L41.91 77.153c7.533-22.514 28.575-39.226 53.34-39.226z"
          />
        </svg>
        <span> Continue with Google</span>
      </div>
    </button>
  );
};
