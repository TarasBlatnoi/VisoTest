import { useMealCartStore } from "../../store/cartStore";
import { useEffect, useState } from "react";

function Cart() {
  const { meals, removeMeal, clearCart, totalMeals, getCombinedIngredients } =
    useMealCartStore();
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <p>Loading meals...</p>;
  }

  return (
    <>
      <div>
        <h2>Your Meal Plan ({totalMeals} meals)</h2>
        {meals.length === 0 ? (
          <p>No meals added yet.</p>
        ) : (
          meals.map((meal) => (
            <div key={meal.idMeal} className="flex w-full">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-16 h-16 rounded-md"
              />
              <div>
                <h3>{meal.strMeal}</h3>
                <p>
                  {meal.strCategory} • {meal.strArea}
                </p>
              </div>
              <div>
                <h2>Ingredients</h2>
                {meals.length === 0 ? (
                  <p>No meals added yet.</p>
                ) : (
                  getCombinedIngredients().map((ingredient) => (
                    <div
                      key={ingredient.mealId + ingredient.name}
                      className="meal-card"
                    >
                      <div>
                        <h3>{ingredient.name}</h3>
                        <p>{ingredient.measure}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => removeMeal(meal.idMeal)}
                className="bg-red-400"
              >
                Remove
              </button>
            </div>
          ))
        )}
        <button onClick={clearCart}>Clear Meal Plan</button>
      </div>
    </>
  );
}

export default Cart;
