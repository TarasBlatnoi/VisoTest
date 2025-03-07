import { useNavigate } from "react-router-dom";
import { IMeal } from "../types/Meal.type";

interface MealCardProps {
  meal: IMeal;
}

function MealCard({ meal }: MealCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-gray-200 cursor-pointer w-full h-[45vh] flex flex-col items-center"
      onClick={() => {
        navigate(meal.idMeal);
      }}
    >
      <h2 className="text-center">{meal.strMeal}</h2>
      <p>{meal.strCategory}</p>
      <div className="w-full h-[80%] overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt="mealImg"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default MealCard;
