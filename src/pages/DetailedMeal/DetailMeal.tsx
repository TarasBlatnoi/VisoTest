import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import MealAPI from "../../api/Meal/MealAPI";

function DetailMeal() {
  const { id } = useParams();
  const { data: meal } = useQuery({
    queryKey: ["meals", id],
    queryFn: () => MealAPI.getMealById(id!),
    staleTime: Infinity,
  });
  return (
    <div>
      <h1>{meal?.strArea}</h1>
      <h2>{meal?.strCategory}</h2>
      <p>{meal?.strInstructions}</p>
      <img src={meal?.strMealThumb} alt={meal?.strMeal} />
    </div>
  );
}

export default DetailMeal;
