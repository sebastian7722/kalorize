import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const FoodTable = pgTable("food", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  category: text(),
  calories: integer(),
  totalProtein: numeric({ precision: 5, scale: 1 }),
  totalCarbs: numeric({ precision: 5, scale: 1 }),
  sugars: numeric({ precision: 5, scale: 1 }),
  fiber: numeric({ precision: 5, scale: 1 }),
  totalFat: numeric({ precision: 5, scale: 1 }),
  saturatedFat: numeric({ precision: 5, scale: 1 }),
  transFat: numeric({ precision: 5, scale: 1 }),
  monounsaturatedFat: numeric({ precision: 5, scale: 1 }),
  polyunsaturatedFat: numeric({ precision: 5, scale: 1 }),
  cholesterol: numeric({ precision: 5, scale: 1 }),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
