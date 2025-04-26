import { NextRequest, NextResponse } from "next/server";
import {
  getUserFromSession,
  updateUserSessionExpiration,
} from "./auth/session";

export async function middleware(request: NextRequest) {
  const response = (await middlewareAuth(request)) ?? NextResponse.next();

  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value });
    },
    get: (key) => request.cookies.get(key),
  });

  return response;
}

async function middlewareAuth(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/sign-in" ||
    request.nextUrl.pathname.includes("/api/oauth")
  ) {
    return NextResponse.next();
  }

  const user = await getUserFromSession(request.cookies);
  if (user == null) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
  runtime: "nodejs",
};
