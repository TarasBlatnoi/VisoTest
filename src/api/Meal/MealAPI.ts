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
  async getMealsByCategory() {
    const data = await this.getCategories();
    let allMeals: IMeal[] = [];

    for (const category of data.categories) {
      const categoryResponse = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
      );
      const categoryData = await categoryResponse.json();
      allMeals = [
        ...allMeals,
        ...categoryData.meals.map((meal: IMeal) => ({
          ...meal,
          ...category,
        })),
      ];
    }
    const shuffledMeals = allMeals.sort(() => Math.random() - 0.5);
    return { meals: shuffledMeals, categories: data.categories };
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
