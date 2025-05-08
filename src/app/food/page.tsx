import FoodCard from "@/components/food-card";
import { db } from "@/drizzle/db";
import { FoodTable } from "@/drizzle/schema/food";

async function getFoodList() {
  return db
    .select({
      id: FoodTable.id,
      name: FoodTable.name,
      calories: FoodTable.calories,
      totalProtein: FoodTable.totalProtein,
      totalFat: FoodTable.totalFat,
      totalCarbs: FoodTable.totalCarbs,
    })
    .from(FoodTable);
}

export default async function FoodList() {
  const foodList = await getFoodList();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {foodList.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}
