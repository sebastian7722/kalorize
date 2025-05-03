import { db } from "@/drizzle/db";
import { userRoles, UserSessionTable, UserTable } from "@/drizzle/schema/users";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { z } from "zod";

// Seven days in seconds
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
const COOKIE_SESSION_KEY = "session-id";

const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(userRoles),
});

type UserSession = z.infer<typeof sessionSchema>;
export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  return getUserSessionById(sessionId);
}

export async function updateUserSessionData(
  user: UserSession,
  cookies: Pick<Cookies, "get">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  const updatedUser = sessionSchema.parse(user);

  const [{ userId: dbUserId }] = await db
    .update(UserSessionTable)
    .set({
      expiresAt: new Date(getNewExpirationInMs()),
    })
    .where(eq(UserSessionTable.id, sessionId))
    .returning({ userId: UserSessionTable.userId });

  await db
    .update(UserTable)
    .set({ role: updatedUser.role })
    .where(eq(UserTable.id, dbUserId));
}

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">
) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  await db.insert(UserSessionTable).values({
    id: sessionId,
    userId: user.id,
    expiresAt: new Date(getNewExpirationInMs()),
  });

  setCookie(sessionId, cookies);
}

export async function updateUserSessionExpiration(
  cookies: Pick<Cookies, "get" | "set">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  const user = await getUserSessionById(sessionId);
  if (user == null) return;

  await db
    .update(UserSessionTable)
    .set({
      expiresAt: new Date(getNewExpirationInMs()),
    })
    .where(eq(UserSessionTable.id, sessionId));

  setCookie(sessionId, cookies);
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, "get" | "delete">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  await db.delete(UserSessionTable).where(eq(UserSessionTable.id, sessionId));

  cookies.delete(COOKIE_SESSION_KEY);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: getNewExpirationInMs(),
  });
}

async function getUserSessionById(sessionId: string) {
  const rawUser = await db
    .select({
      sessionId: UserSessionTable.id,
      id: UserSessionTable.userId,
      role: UserTable.role,
    })
    .from(UserSessionTable)
    .innerJoin(UserTable, eq(UserSessionTable.userId, UserTable.id))
    .where(eq(UserSessionTable.id, sessionId))
    .limit(1);

  if (rawUser.length === 0) return null;

  const { success, data: user } = sessionSchema.safeParse(rawUser[0]);

  return success ? user : null;
}

function getNewExpirationInMs() {
  return Date.now() + SESSION_EXPIRATION_SECONDS * 1000;
}
