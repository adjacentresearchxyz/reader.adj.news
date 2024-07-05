import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/NavigationMenu";
import LoginButton from "./LoginButton";
import TryNowButton from "./TryNowButton";
import WaitlistButton from "./WaitlistButton";

export default function NavBar() {
  return (
    <nav className="sticky top-2 z-50 flex h-12 justify-center px-2 md:top-5 md:px-0">
      <div className="mx-1 flex w-full transform items-center justify-center rounded-[10px] border bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_1px,rgba(0,0,0,0.04)_0px_15px_30px] md:w-fit">
        <Link
          href="/"
          className="ml-4 mr-5 flex items-start text-base font-[650]"
        >
          <img src="/logo.svg" alt="Adjacent News Logo" className="h-8 w-auto" />

        </Link>
        <MobileNav />
        <div className="flex items-center space-x-5 text-sm font-[550]">
          <Link
            className={`hidden md:block`}
            href="https://data.adj.news/"
          >
            Data
          </Link>
          <Link href="https://press.adjacentresearch.xyz" className="hidden md:block">
            Press
          </Link>
          <Link href="/about" className="hidden md:block">
            About
          </Link>
          <Link href="https://adjacent.canny.io/" className="hidden md:block">
            Feedback
          </Link>
          <Link href="https://www.notion.so/62beb3cc57d042af89c9ef1b3b5f758f?v=999ae1d0e5a749949d593c50f4647a73&pvs=4" className="hidden md:block">
            Roadmap
          </Link>
          {/* <Link href="/pricing" className="hidden md:block">
            Pricing
          </Link> */}
        </div>
        {/** md:ml-32 */}
        <div className="mx-auto ml-auto mr-1.5 space-x-3 md:ml-44">
          <Link href="/feed">
            <TryNowButton />
          </Link>
          {/* <Link href="/login">
            <LoginButton />
          </Link>
          {/* <Link href="https://getwaitlist.com/waitlist/16399" target="_blank">
            <WaitlistButton />
          </Link> */}
        </div>
      </div>
    </nav>
  );
}

const MobileNav = () => {
  return (
    <div className="md:hidden">
      <NavigationMenu>
        <NavigationMenuList className="center">
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <span>Links</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[200px] bg-white py-2">
              <Link href="https://data.adj.news/">
                <NavigationButton title="Data" subtitle="Explore Prediction Markets" />
              </Link>
              <Link href="https://press.adjacentresearch.xyz">
                <NavigationButton title="Research" subtitle="Ramblings on Markets" />
              </Link>
              <Link href="/about">
                <NavigationButton title="About" subtitle="FAQ and Resources" />
              </Link>
              <Link href="https://adjacent.canny.io/">
                <NavigationButton title="Feedback" subtitle="Submit Feature Requests" />
              </Link>
              <Link href="https://www.notion.so/62beb3cc57d042af89c9ef1b3b5f758f?v=999ae1d0e5a749949d593c50f4647a73&pvs=4">
                <NavigationButton title="Roadmap" subtitle="Backlog and Feature Roadmap" />
              </Link>
              {/* <Link href="https://github.com/michaelkremenetsky/Refeed?tab=readme-ov-file#self-hosting-with-docker">
                <NavigationButton
                  title="Self Host"
                  subtitle="Self Host Refeed"
                />
              </Link>
              <Link href="https://github.com/michaelkremenetsky/Refeed?tab=readme-ov-file#contributing">
                <NavigationButton
                  title="Contributing"
                  subtitle="Contribute to Refeed"
                />
              </Link>
              <Link href="https://github.com/michaelkremenetsky/Refeed/issues">
                <NavigationButton
                  title="Report an Issue"
                  subtitle="Report on Github"
                />
              </Link>
              <Link href="/privacy">
                <NavigationButton
                  title="Privacy Policy"
                  subtitle="Privacy Policy"
                />
              </Link> */}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const NavigationButton = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="ml-2 mr-2 flex flex-col rounded-md py-2 pl-2 hover:bg-neutral-100/80">
      <h1 className="z-10 select-none text-sm font-[550] text-[#38383d]">
        {title}
      </h1>
      <h2 className="font-regular z-10 mt-0.5 select-none text-sm font-[425] text-neutral-450 dark:text-stone-400">
        {subtitle}
      </h2>
    </div>
  );
};
