import { useEffect } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Link from "next/link";

function RedirectPage() {
  const user = useUser();

  useEffect(() => {
    if (user?.email) {
      const redirectUrl = `https://ghost-auth-proxy.adjacentresearch.workers.dev/redirect/?email=${user.email}`;
      fetch(redirectUrl, {
        // @TODO: fix bearer token here
        headers: {
          'Authorization': `Bearer 01921bc9-219a-7669-a429-6aa468701d2e`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data?.member_signin_urls && data.member_signin_urls[0].url) {
          console.log(data.member_signin_urls[0].url)
          window.location.href = data.member_signin_urls[0].url;
        }
      })
      .catch(error => console.error('Error fetching redirect URL:', error));
    }
  }, [user]);

  return (
    <div className="mx-auto flex h-screen text-[#38383d]">
      <div className="flex w-full items-center justify-center">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-700 sm:text-5xl">
            Redirecting...
          </h1>
          <div className="mt-5 flex items-center justify-center">
              <Link
                href="/"
                className="rounded-md border border-[#DCDCDC] bg-white px-4 py-1.5 text-base font-medium shadow-[0_1px_2px_rgba(16,29,52,.15)] hover:bg-[#fafafa]"
              >
                Adjacent News
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default RedirectPage;