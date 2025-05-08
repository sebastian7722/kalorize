import { db } from "@/drizzle/db";
import { FoodTable } from "@/drizzle/schema/food";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { z } from "zod";

const idSchema = z.string().uuid();

async function getFoodById(id: string) {
  const foodId = idSchema.safeParse(id);

  if (!foodId.success) notFound();

  const food = await db.query.FoodTable.findFirst({
    where: eq(FoodTable.id, foodId.data),
  });

  if (!food) notFound();

  return food;
}
export default async function FoodDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const food = await getFoodById(slug);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-zinc-800/50 shadow-xl rounded-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-2xl">
        {/* Food Image */}
        <div className="mb-6">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Food"
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Food Name */}
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-100 text-center mb-4">
          {food.name}
        </h1>

        {/* Energy Value */}
        <div className="flex flex-col items-center text-center mb-6">
          <input type="hidden" id="calculatedEnergyValueInit" value="94" />
          <input type="hidden" id="calculatedEnergyValue" value="" />
          <div className="text-3xl font-bold text-gray-100 md:text-4xl">
            {food.calories} kcal
          </div>
          <div className="text-lg text-gray-300 mt-2">
            Also{" "}
            <span className="font-semibold">
              {Math.round((food.calories ?? 0) * 4.184)} kJ
            </span>{" "}
            ● Energy value
          </div>
        </div>

        {/* Protein */}
        <div className="flex justify-between items-center text-red-400 mb-2">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
            <span className="text-lg font-semibold">Protein</span>
          </div>
          <div className="text-lg text-gray-200">{food.totalProtein} g</div>
        </div>
        <hr className="border-gray-700 mb-4" />

        {/* Carbohydrates */}
        <div className="flex justify-between items-center text-blue-400 mb-2">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
            <span className="text-lg font-semibold">Carbohydrates</span>
          </div>
          <div className="text-lg text-gray-200">{food.totalCarbs} g</div>
        </div>
        <div className="flex justify-between items-center text-gray-300 mt-2">
          <div className="text-sm">Sugars</div>
          <div className="text-sm">{food.sugars} g</div>
        </div>
        <hr className="border-gray-700 my-4" />

        {/* Fat */}
        <div className="flex justify-between items-center text-yellow-400 mb-2">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
            <span className="text-lg font-semibold">Fat</span>
          </div>
          <div className="text-lg text-gray-200">{food.totalFat} g</div>
        </div>
        <div className="flex justify-between items-center text-gray-300 mt-2">
          <div className="text-sm">Saturated Fat</div>
          <div className="text-sm">{food.saturatedFat} g</div>
        </div>
        <div className="flex justify-between items-center text-gray-300 mt-2">
          <div className="text-sm">Trans Fat</div>
          <div className="text-sm">{food.transFat} g</div>
        </div>
        <div className="flex justify-between items-center text-gray-300 mt-2">
          <div className="text-sm">Monounsaturated Fat</div>
          <div className="text-sm">{food.monounsaturatedFat} g</div>
        </div>
        <div className="flex justify-between items-center text-gray-300 mt-2">
          <div className="text-sm">Polyunsaturated Fat</div>
          <div className="text-sm">{food.polyunsaturatedFat} g</div>
        </div>
        <div className="flex justify-between items-center text-gray-300 mt-2">
          <div className="text-sm">Cholesterol</div>
          <div className="text-sm">{food.cholesterol} mg</div>
        </div>
        <hr className="border-gray-700 my-4" />

        {/* Fiber */}
        <div className="flex justify-between items-center text-gray-200 mb-2">
          <div className="text-lg font-semibold">Fiber</div>
          <div className="text-lg">{food.fiber} g</div>
        </div>
      </div>
    </div>
  );
}
