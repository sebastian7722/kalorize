import { sql, SQL } from "drizzle-orm";
import { AnyPgColumn } from "drizzle-orm/pg-core";

export function lower(text: AnyPgColumn): SQL {
  return sql`lower(${text})`;
}
