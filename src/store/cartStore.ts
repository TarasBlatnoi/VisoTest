import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IMeal } from "../types/Meal.type";

export interface Ingredient {
  name: string;
  measure: string;
  mealId: string;
  mealName: string;
}

interface MealCartStore {
  meals: IMeal[];
  addMeal: (meal: IMeal) => void;
  removeMeal: (idMeal: string) => void;
  clearCart: () => void;
  totalMeals: number;
  getCombinedIngredients: () => Ingredient[];
}

export const useMealCartStore = create<MealCartStore>()(
  persist(
    (set, get) => {
      let storedMeals: IMeal[] = [];
      try {
        const localData = localStorage.getItem("meal-recipe-cart");
        if (localData) {
          const parsedData = JSON.parse(localData);
          storedMeals = parsedData.state?.meals || [];
        }
      } catch (error) {
        console.error("Failed to parse localStorage", error);
      }

      return {
        meals: storedMeals,
        totalMeals: storedMeals.length,

        addMeal: (meal) =>
          set((state) => {
            if (state.meals.find((m) => m.idMeal === meal.idMeal)) return state;
            return {
              meals: [...state.meals, meal],
              totalMeals: state.totalMeals + 1,
            };
          }),

        removeMeal: (idMeal) =>
          set((state) => {
            const updatedMeals = state.meals.filter(
              (meal) => meal.idMeal !== idMeal
            );
            return { meals: updatedMeals, totalMeals: updatedMeals.length };
          }),

        clearCart: () => set({ meals: [], totalMeals: 0 }),

        getCombinedIngredients: () => {
          const meals = get().meals;
          const ingredients: Ingredient[] = [];

          meals.forEach((meal) => {
            for (let i = 1; i <= 20; i++) {
              const ingredientKey = `strIngredient${i}`;
              const measureKey = `strMeasure${i}`;
              if (
                meal[ingredientKey] &&
                meal[ingredientKey] !== "" &&
                meal[ingredientKey] !== null
              ) {
                ingredients.push({
                  name: meal[ingredientKey] as string,
                  measure: (meal[measureKey] as string) || "",
                  mealId: meal.idMeal,
                  mealName: meal.strMeal,
                });
              }
            }
          });

          return ingredients;
        },
      };
    },
    {
      name: "meal-recipe-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        meals: state.meals,
        totalMeals: state.totalMeals,
      }),
    }
  )
);
