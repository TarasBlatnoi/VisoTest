import { useNavigate } from "react-router-dom";
import { IMeal } from "../types/Meal.type";

interface MealCardProps {
  meal: IMeal;
}

function MealCard({ meal }: MealCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-gray-200 p-4 m-4 cursor-pointer"
      onClick={() => {
        navigate(meal.idMeal);
      }}
    >
      <h2 className="text-center">{meal.strMeal}</h2>
      <br />
      <p>{meal.strCategory}</p>
      <img src={meal.strMealThumb} alt="mealImg" />
    </div>
  );
}

export default MealCard;
