"use client";

import { FoodSearchResponse } from "@/app/api/food/route";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";

export default function Searchbar() {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<FoodSearchResponse[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (search.length >= 3) {
      fetch(`/api/food?name=${search}`)
        .then((res) => res.json())
        .then((res: FoodSearchResponse[]) => {
          setSearchResult(res);
        });
    } else {
      setSearchResult([]);
    }

    const closeDropdown = (e: MouseEvent) => {
      if (searchRef.current == null) return;
      if (!searchRef.current.contains(e.target as Node) && search.length >= 3) {
        setSearch("");
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, [search]);

  return (
    <div className="relative" ref={searchRef}>
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search food"
      />
      <div className={cn(search.length >= 3 ? "flex" : "hidden")}>
        <div className="absolute bg-zinc-700/50 rounded-md p-5 mt-1 w-full">
          <p className="text-zinc-50">Search results for: {search}</p>
          <ul className="list-disc list-inside text-zinc-200 mt-2">
            {searchResult.map((food, i) => (
              <li key={i}>
                {food.name} - {food.calories} kcal 100g
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
