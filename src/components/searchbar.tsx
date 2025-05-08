"use client";

import { FoodSearchResponse } from "@/app/api/food/route";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./searchbar.module.css";

import slugify from "slugify";

function createSlug(name: string) {
  return slugify(name, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
}

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
      <input
        className={cn(
          "bg-zinc-700/50 text-zinc-50 rounded-md px-4.5 py-3 w-full focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2 focus:ring-offset-zinc-900",
          styles["search-input"]
        )}
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search food"
      />
      <div className={cn(search.length >= 3 ? "flex" : "hidden")}>
        <div className="absolute bg-zinc-800 rounded-md p-5 mt-2 w-full">
          <p className="text-zinc-50">Search results for: {search}</p>
          <ul className="flex flex-col text-zinc-200 mt-2 gap-2">
            {searchResult.map((food) => (
              <Link
                key={food.id}
                href={`/food/${food.id}`}
                onClick={() => setSearch("")}
              >
                <li className="list-none bg-zinc-700 px-4 py-3 rounded-md hover:bg-zinc-600 transition-colors duration-200 cursor-pointer">
                  {food.name} - {food.calories} kcal 100g
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
