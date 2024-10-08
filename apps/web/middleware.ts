import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function generateCsp() {
  // generate random nonce converted to base64. Must be different on every HTTP page load
  // const nonce = crypto.randomBytes(16).toString('base64')
  const nonce = crypto.randomUUID();

  const csp = [
    { name: "default-src", values: ["'self'"] },
    {
      name: "script-src",
      values: [
        "'report-sample'",
        "'self'",
        `'nonce-${nonce}'`,
        "'strict-dynamic'",
      ],
    },
    {
      name: "style-src",
      values: ["'report-sample'", "'self'", `'nonce-${nonce}'`],
    },
    {
      name: "connect-src",
      values: ["'self'"],
    },
    { name: "font-src", values: ["'self'", "data:"] },
    { name: "img-src", values: ["'self'", "data:"] },
    { name: "worker-src", values: ["'self'", "blob:"] },
    { name: "frame-ancestors", values: ["'none'"] },
    { name: "form-action", values: ["'self'"] },
  ];

  const cspString = csp
    .map((directive) => {
      return `${directive.name} ${directive.values.join(" ")}`;
    })
    .join("; ");

  return { csp: cspString, nonce };
}

export async function middleware(req: NextRequest) {
  const { csp, nonce } = generateCsp();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

  const headerKey =
    req.nextUrl.pathname === "/csp-report-only"
      ? "content-security-policy-report-only"
      : "content-security-policy";

  requestHeaders.set(headerKey, csp);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(headerKey, csp);

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = await supabase.auth.getUser();

  // Match URLs of the pattern /feed/anything?item=
  const sanitizedPathname = req.nextUrl.pathname.replace(/#.*/, '');
  const sanitizedSearch = req.nextUrl.search.replace(/#.*/, '');
  const feedItemRegex = /^\/feed\/.*\?item=/;

  if (feedItemRegex.test(sanitizedPathname + sanitizedSearch)) {
    const urlSearchParams = new URLSearchParams(sanitizedSearch);
    const item = urlSearchParams.get('item');
    return NextResponse.redirect(new URL(`/reader?item=${item}`, req.url));
  }
  
  // if signed in and wanting to auth into ghost redirect them 
  // if (session && req.nextUrl.pathname === "/redirect") {
  //   const redirectUrl = new URL(`https://ghost-auth-proxy.adjacentresearch.workers.dev/redirect/?email=${user.data.user?.email}`);
  //   return NextResponse.redirect(redirectUrl);
  // }

  

  // if user is signed in and the current path is /login the user to the app
  if (session && req.nextUrl.pathname === "/login") {
    // if user is signed in and the current path is /login and the search param includes ?ghost=true redirect them to /redirect
    if (req.nextUrl.search.includes("?ghost=true")) {
      return NextResponse.redirect(new URL("/redirect", req.url));
    } else {
      return NextResponse.redirect(new URL("/feed/all", req.url));
    }
  }

  if (session && req.nextUrl.pathname === "/signup") {
    return NextResponse.redirect(new URL("/feed/all", req.url));
  }

  if (!session && req.nextUrl.pathname === "/bookmarks" || req.nextUrl.pathname === "/recentlyread") {
    return NextResponse.redirect(new URL("/feed/all", req.url));
  }

  // Unauthenticated users can read the feed but not custom 
  // Redirect straight to app if they are on landing page
  if (req.nextUrl.pathname === "/feed") {
    return NextResponse.redirect(new URL("/feed/all", req.url));
  }

  // Check if the user is on a page they aren't supposed to be on
  if (
    !session &&
    req.nextUrl.pathname !== "/" &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/signup" &&
    req.nextUrl.pathname !== "/pricing" &&
    req.nextUrl.pathname !== "/redirect"
  ) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/feed",
    "/feed/:path*",
    "/discover",
    "/folder",
    "/recentlyread",
    "/bookmarks",
    "/login",
    "/signup",
    "/redirect",
  ],
};
