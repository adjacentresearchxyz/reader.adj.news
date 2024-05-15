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
          <img src="https://pbs.twimg.com/profile_images/1668357289747554304/7NSJ60Fd_400x400.jpg" alt="Refeed Logo" className="h-8 w-auto" />
        </Link>
        <MobileNav />
        <div className="flex items-center space-x-5 text-sm font-[550]">
          <Link
            className={`hidden md:block`}
            href="https://data.adj.news/markets"
          >
            Data
          </Link>
          <Link href="https://adjacentresearch.substack.com" className="hidden md:block">
            Research
          </Link>
          {/* <Link href="/pricing" className="hidden md:block">
            Pricing
          </Link> */}
        </div>
        {/** md:ml-32 */}
        <div className="mx-auto ml-auto mr-1.5 space-x-3 md:ml-44">
          {/* <Link href="/login">
            <LoginButton />
          </Link>
          <Link href="/signup">
            <TryNowButton />
          </Link> */}
          <Link href="https://getwaitlist.com/waitlist/16399" target="_blank">
            <WaitlistButton />
          </Link>
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
              <Link href="https://data.adj.news/markets">
                <NavigationButton title="Data" subtitle="Explore Prediction Markets" />
              </Link>
              <Link href="https://adjacentresearch.substack.com">
                <NavigationButton title="Research" subtitle="Ramblings on Markets" />
              </Link>
              <Link href="/pricing">
                <NavigationButton title="Pricing" subtitle="Subscribe" />
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
