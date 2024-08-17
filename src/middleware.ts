import { NextResponse } from "next/server";
import { auth } from "../auth";

export default auth((req) => {
  console.log("middleware runs");
  //   const url = req.nextUrl.pathname;
  //   const AuthenticatedUser = req.auth?.user;
  //   const publicPaths = ["/sign-in", "/sign-up", "/verify"];
  //   if (AuthenticatedUser && publicPaths.includes(url)) {
  //     return NextResponse.redirect(new URL("/dashboard", req.url));
  //   }
  //   if (!AuthenticatedUser && !publicPaths.includes(url)) {
  //     return NextResponse.redirect(new URL("/sign-in", req.url));
  //   }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/verify/:path*"],
  unstable_allowDynamic: [
    "/node_modules/@nextui-org/calendar/dist/chunk-NABLCSM5.mjs",
    "/node_modules/@nextui-org/theme/dist/chunk-YSA7EQBH.mjs",
    "/node_modules/@nextui-org/calendar/dist/index.mjs",
    "/node_modules/@nextui-org/react/dist/index.mjs",
    "/node_modules/@nextui-org/theme/dist/index.mjs",
    "/node_modules/lodash.kebabcase/index.js",
    "/node_modules/lodash.debounce/index.js",
    "/node_modules/lodash.mapkeys/index.js",
    "/node_modules/lodash.omit/index.js",
    "/node_modules/lodash.get/index.js",
    "/node_modules/mongoose/dist/browser.umd.js"
  ]
};
