import { useNavigate } from "react-router-dom";
import { IMeal } from "../types/Meal.type";
import { useMealCartStore } from "../store/cartStore";

interface MealCardProps {
  meal: IMeal;
}

function MealCard({ meal }: MealCardProps) {
  const navigate = useNavigate();
  const { addMeal, meals } = useMealCartStore();
  console.log({ meals });
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
      <button
        className="bg-amber-800 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          console.log("AddingMeal", { meal });
          addMeal(meal);
        }}
      >
        Add to card
      </button>
    </div>
  );
}

export default MealCard;
