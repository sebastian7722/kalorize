import { db } from "@/drizzle/db";
import { FoodTable } from "@/drizzle/schema/food";
import { ilike } from "drizzle-orm";
import { NextRequest } from "next/server";
import { z } from "zod";

export const foodResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  calories: z.number(),
  totalProtein: z.coerce.number(),
  totalCarbs: z.coerce.number(),
  sugars: z.coerce.number(),
  fiber: z.coerce.number(),
  totalFat: z.coerce.number(),
  saturatedFat: z.coerce.number(),
  transFat: z.coerce.number(),
  monounsaturatedFat: z.coerce.number(),
  polyunsaturatedFat: z.coerce.number(),
  cholesterol: z.coerce.number(),
});

export type FoodSearchResponse = z.infer<typeof foodResponseSchema>;

const searchSchema = z.object({
  name: z
    .string()
    .min(3, "Search must be more or equal to 3 characters")
    .trim(),
});

export async function GET(request: NextRequest) {
  const foodNameRaw = request.nextUrl.searchParams.get("name");

  let foodName: string | undefined;
  try {
    const validated = searchSchema.safeParse({ name: foodNameRaw });
    if (!validated.success) {
      return Response.json({ error: validated.error.message }, { status: 400 });
    }
    foodName = validated.data.name;
  } catch (error) {
    return Response.json({ error: "Invalid search term" }, { status: 400 });
  }

  if (!foodName) {
    return Response.json([]);
  }

  const dbData = await db
    .select()
    .from(FoodTable)
    .where(ilike(FoodTable.name, `%${foodName}%`));

  const result = dbData.map((food) => foodResponseSchema.parse(food));

  return Response.json(result);
}
