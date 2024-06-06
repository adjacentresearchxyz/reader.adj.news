import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Tilt from "react-parallax-tilt";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="background-pattern border-b border-neutral-200/80 bg-[#fafafa]">
      <main className="z-10">
        <div className="mt-20">
          <div className="mx-auto max-w-4xl px-5 lg:px-8 xl:max-w-7xl">
            <div className="mx-auto flex flex-col items-center text-center ">
              {/* <div className="z-10 mb-4">
                <Banner />
              </div> */}
              <h1 className="z-10 text-[60px] font-[775] leading-none tracking-tight sm:text-[100px] md:text-[130px] lg:w-[900px]">
                <span className="text-black-500">News through the </span>
                <span className="text-black-500">
                  Markets
                </span>
              </h1>
              <div className="z-10 mt-6">
                <Link href="https://getwaitlist.com/waitlist/16399" target="_blank">
                  <button className="rounded-md bg-white px-6 py-2 text-base font-medium shadow-[0_0_0_1px_rgba(18,55,105,0.08),0_1px_2px_0_rgba(18,55,105,0.12)]">
                    Join the Waitlist -&gt;{" "}
                  </button>
                </Link>
              </div>
            </div>
            <div className="lg-[2000px] z-10 mt-6 translate-y-12 transform">
              <div
                className="rounded-lg shadow-[0px_0px_50px_100px_rgba(30,161,255,0.02)]"
                onClick={() => {
                  // router.push("/signup");
                  router.push("https://getwaitlist.com/waitlist/16399")
                }}
              >
                <Tilt scale={1.01} tiltMaxAngleY={0} tiltMaxAngleX={1.5}>
                  <Image
                    src="markets.png"
                    alt="Markets"
                    priority
                    width={1920}
                    height={995}
                    unoptimized
                    className="scale-[1.03] transform rounded-lg border border-neutral-200 shadow-[0px_20px_70px_-10px_hsla(227,30%,20%,0.08),0px_10px_24px_-8px_hsla(227,30%,20%,0.04),0px_1px_4px_-1px_hsla(227,30%,20%,0.06)]"
                  />
                </Tilt>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
