import { env } from "@/data/env/server";
import { drizzle } from "drizzle-orm/node-postgres";
import * as foodSchema from "./schema/food";
import * as usersSchema from "./schema/users";

export const db = drizzle({
  schema: { ...usersSchema, ...foodSchema },
  connection: env.DATABASE_URL,
});
