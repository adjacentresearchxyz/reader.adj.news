import type { SVGProps } from "react";
import Link from "next/link";

export const BottomFooter = () => {
  return (
    <footer className="bg-white pt-6 dark:bg-neutral-900">
      <div className="w-full max-w-screen-xl p-4 py-6 sm:mx-2 md:mx-auto md:w-[825px] md:py-8 xl:w-[1252px]">
        <div className="md:flex md:justify-between">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-7 sm:gap-6">
            <div>
              <h2 className="text-sm mb-6 text-base font-medium text-neutral-900 dark:text-white">
                Products
              </h2>
              <ul className="text-sm font-medium text-neutral-450">
                <li className="mb-4">
                  <Link href="https://adj.news" target="_blank" className="hover:underline">
                    News
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="https://adj.news/feed" target="_blank" className="hover:underline">
                    RSS Reader
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="https://data.adj.news" target="_blank" className="hover:underline">
                    Data Platform
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="https://observablehq.com/collection/@adjacent/adjacent-news" target="_blank" className="hover:underline">
                    Notebooks
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="https://github.com/adjacentresearchxyz/chrome.adj.news" target="_blank" className="hover:underline">
                    Chrome Extension
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="https://docs.adj.news" target="_blank" className="hover:underline">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm mb-6 text-base font-medium text-neutral-900 dark:text-white">
                Resources
              </h2>
              <ul className="text-sm font-medium text-neutral-450">
                <li className="text-sm mb-4">
                  <a href="/about" className="hover:underline">
                    About
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://adjacent.canny.io/" className="hover:underline">
                    Feedback
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://www.notion.so/62beb3cc57d042af89c9ef1b3b5f758f?v=999ae1d0e5a749949d593c50f4647a73&pvs=4" className="hover:underline">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm mb-6 text-base font-medium text-neutral-900 dark:text-white">
                Engineering
              </h2>
              <ul className="text-sm font-medium text-neutral-450">
                <li className="mb-4">
                  <Link href="/opensource" className="hover:underline">
                    Open Source
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="https://adj.news/tag/engineering/" className="hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm mb-6 text-base font-medium text-neutral-900 dark:text-white">
                Utilities
              </h2>
              <ul className="text-sm font-medium text-neutral-450">
                <li className="mb-4">
                  <Link href="https://rss-finder.rook1e.com/" target="_blank" className="hover:underline">
                    Find RSS Feed
                  </Link>
                </li>
                <li className="text-sm mb-4">
                  <Link href="/rss/youtube" className="hover:underline">
                    Youtube RSS
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm mb-6 text-base font-medium text-neutral-900 dark:text-white">
                Funding
              </h2>
              <ul className="text-sm font-medium text-neutral-450">
                <li className="text-sm mb-4">
                  <Link href="https://manifund.org/projects/adjacent-news" className="hover:underline">
                    Manifund
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="https://explorer.gitcoin.co/#/projects/0x3f41e1ebe5e4dc04373a56b48eb0d59a27274660b5aa50dfb98fb3aebb828ded" className="hover:underline">
                    Gitcoin
                  </Link>
                </li>
                <li className="text-sm mb-4">
                  <Link href="/addresses" className="hover:underline">
                    Addresses
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm mb-6 text-base font-medium text-neutral-900 dark:text-white">
                Follow us
              </h2>
              <ul className="text-sm font-medium text-neutral-450">
                <li className="mb-4">
                  <a
                    href="https://twitter.com/adjacent___"
                    className="hover:underline"
                  >
                    Twitter
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://t.me/m/VhSEJb5LYjYx"
                    className="hover:underline"
                  >
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm mb-6 text-base font-medium text-neutral-900 dark:text-white">
                Legal
              </h2>
              <ul className="font-medium text-neutral-450">
                <li className="text-sm mb-4">
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li className="text-sm">
                  <a href="/terms" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const EmptyMessageSvgForFooter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 224 200"
    fill="none"
    {...props}
  >
    <path
      fill="#fcfcfd"
      stroke="#d4d4d4"
      strokeWidth={1.5}
      d="M44.478 73h133.444a9.001 9.001 0 0 1 8.975 8.327l8.1 108c.391 5.221-3.739 9.673-8.975 9.673H36.378c-5.236 0-9.366-4.452-8.975-9.673l8.1-108A9 9 0 0 1 44.478 73Z"
      className="box-shadow-[rgba(0,0,0,0.05)_0px_0px_1px,rgba(0,0,0,0.04)_0px_15px_30px]"
    />
    <path
      fill="#fcfcfd"
      stroke="#d4d4d4"
      strokeWidth={1.5}
      d="M31.577 44.2h159.246a9 9 0 0 1 8.966 8.214l9.462 108.001c.461 5.26-3.685 9.785-8.966 9.785H22.115c-5.281 0-9.427-4.525-8.966-9.785l9.462-108a9 9 0 0 1 8.966-8.215Z"
      className="box-shadow-[rgba(0,0,0,0.05)_0px_0px_1px,rgba(0,0,0,0.04)_0px_15px_30px]"
    />
    <path
      fill="#fcfcfd"
      stroke="#d4d4d4"
      strokeWidth={1.5}
      d="M28.276 1h164.941a9 9 0 0 1 8.893 7.612l19.101 122.4c.851 5.458-3.369 10.388-8.893 10.388H11.468c-5.458 0-9.66-4.818-8.917-10.224L19.36 8.776A9 9 0 0 1 28.276 1Z"
      className="box-shadow-[rgba(0,0,0,0.05)_0px_0px_1px,rgba(0,0,0,0.04)_0px_15px_30px]"
    />
  </svg>
);
