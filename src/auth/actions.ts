"use server";

import { OAuthProvider } from "@/drizzle/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getOAuthClient } from "./oauth/client";
import { removeUserFromSession } from "./session";

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/");
}

export async function oAuthSignIn(provider: OAuthProvider) {
  const oAuthClient = getOAuthClient(provider);
  redirect(oAuthClient.createAuthUrl(await cookies()));
}
