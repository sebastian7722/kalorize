import { env } from "@/data/env/server";
import { z } from "zod";
import { OAuthClient } from "./client";

export function createGoogleOAuthClient() {
  return new OAuthClient({
    provider: "google",
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    scopes: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ],
    urls: {
      auth: "https://accounts.google.com/o/oauth2/v2/auth",
      token: "https://oauth2.googleapis.com/token",
      user: "https://www.googleapis.com/oauth2/v2/userinfo",
    },
    userInfo: {
      schema: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
      }),
      parser: (user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
    },
  });
}
