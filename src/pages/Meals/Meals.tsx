import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MealAPI from "../../api/Meal/MealAPI";
import MealCard from "../../components/MealCard";
import Filter from "../../components/Filter";
import { useCategoryFilterStore } from "../../store/categoryStore";
import Pagination from "../../components/Pagintaion";
import { useNavigate } from "react-router-dom";

const MEALS_PER_PAGE = 6;

function Meals() {
  const { data } = useQuery({
    queryKey: ["meals"],
    queryFn: MealAPI.getMealsByLetter.bind(MealAPI),
    staleTime: Infinity,
  });
  const navigate = useNavigate();
  const { categoriesFilter } = useCategoryFilterStore();
  const [searchMeal, setSearchMeal] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: searchedMeals } = useQuery({
    queryKey: ["meals", debouncedSearch],
    queryFn: () => MealAPI.getMealsOnName(debouncedSearch),
    staleTime: Infinity,
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => MealAPI.getCategories(),
    staleTime: Infinity,
  });
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchMeal.length === 1 || searchMeal.length === 0)
        setDebouncedSearch(searchMeal);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchMeal]);
  const mealsToDisplay =
    debouncedSearch && Array.isArray(searchedMeals) && searchedMeals.length
      ? searchedMeals
      : data?.meals;
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

  const indexOfLastPost = currentPage * MEALS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - MEALS_PER_PAGE;
  const currentMeals = filteredMeals?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToCart = () => {
    navigate("/cart");
  };
  return (
    <div>
      <button onClick={goToCart}>GoToCart</button>
      <div className="grid grid-cols-[2fr_6fr_2fr] ">
        <Filter categories={categories?.categories} />
        <div className="w-full h-full">
          <div className="grid grid-cols-3 w-full h-[92vh]">
            {currentMeals?.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
          <Pagination
            postsPerPage={MEALS_PER_PAGE}
            totalPosts={filteredMeals?.length || 0}
            paginate={paginate}
          />
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
