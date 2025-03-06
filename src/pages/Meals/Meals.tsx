import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MealAPI from "../../api/Meal/MealAPI";
import MealCard from "../../components/MealCard";
import Filter from "../../components/Filter";
import { useCategoryFilterStore } from "../../store/categoryStore";

function Meals() {
  const { data } = useQuery({
    queryKey: ["meals"],
    queryFn: MealAPI.getMealsByCategory.bind(MealAPI),
    staleTime: Infinity,
  });

  const { categoriesFilter } = useCategoryFilterStore();
  const [searchMeal, setSearchMeal] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data: searchedMeals } = useQuery({
    queryKey: ["meals", debouncedSearch],
    queryFn: () => MealAPI.getMealsOnName(debouncedSearch),
    staleTime: Infinity,
  });
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchMeal.length === 1) setDebouncedSearch(searchMeal);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchMeal]);
  console.log({ searchedMeals });
  const mealsToDisplay =
    debouncedSearch && Array.isArray(searchedMeals) && searchedMeals.length
      ? searchedMeals
      : data?.meals;
  console.log({ mealsToDisplay, debouncedSearch });
  let filteredMeals = mealsToDisplay?.filter((meal) =>
    categoriesFilter.includes(meal.strCategory)
  );
  if (categoriesFilter.length === 0) {
    if (
      debouncedSearch &&
      Array.isArray(searchedMeals) &&
      searchedMeals.length
    ) {
      filteredMeals = searchedMeals;
    } else {
      filteredMeals = data?.meals;
    }
  }

  return (
    <div>
      <div className="grid grid-cols-[2fr_6fr_2fr]">
        <Filter categories={data?.categories} />
        <div className="grid grid-cols-3 p-4 w-full">
          {filteredMeals?.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
        <input
          className="bg-blue-400 w-30 h-10 rounded-lg mt-8 ml-4 pb-1 pl-2"
          type="text"
          value={searchMeal}
          placeholder="Find your meal..."
          onChange={(e) => setSearchMeal(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Meals;
