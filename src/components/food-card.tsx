import Link from "next/link";

export default function FoodCard({
  food,
}: {
  food: {
    id: string;
    name: string;
    calories: number | null;
    totalProtein: string | null;
    totalCarbs: string | null;
    totalFat: string | null;
  };
}) {
  return (
    <Link href={`/food/${food.id}`} className="block">
      <div className="bg-zinc-800/80 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          alt="Food"
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />

        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-100 mb-2 text-center">
            {food.name}
          </h2>

          <div className="text-sm text-gray-300 text-center mb-3">
            {food.calories} kcal • 100 g
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-red-400">
              <span className="text-sm font-medium">Protein</span>
              <span className="text-sm">{food.totalProtein} g</span>
            </div>

            <div className="flex justify-between items-center text-blue-400">
              <span className="text-sm font-medium">Carbohydrates</span>
              <span className="text-sm">{food.totalCarbs} g</span>
            </div>

            <div className="flex justify-between items-center text-yellow-400">
              <span className="text-sm font-medium">Fat</span>
              <span className="text-sm">{food.totalFat} g</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
