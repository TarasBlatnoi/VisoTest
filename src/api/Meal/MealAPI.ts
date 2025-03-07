import { IDetailedMeal } from "../../types/DetailedMeal.type";
import { IMeal } from "../../types/Meal.type";

class MealAPI {
  async getCategories() {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await response.json();
    return data;
  }
  async getMealsByLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let allMeals: IMeal[] = [];

    const mealRequests = alphabet.map(async (letter) => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
      );
      const data = await response.json();
      if (data.meals) {
        allMeals = [...allMeals, ...data.meals];
      }
    });

    await Promise.all(mealRequests);

    const shuffledMeals = allMeals.sort(() => Math.random() - 0.5);
    console.log({ shuffledMeals });
    return { meals: shuffledMeals };
  }

  async getMealById(id: string) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data: { meals: IDetailedMeal[] } = await response.json();
    return data.meals[0];
  }

  async getMealsOnName(name: string) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`
    );
    const data: { meals: IMeal[] } = await response.json();
    return data.meals;
  }
}

export default new MealAPI();
