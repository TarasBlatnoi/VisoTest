import { create } from "zustand";

interface CategoryFilterStore {
  categoriesFilter: string[]; 
  setCategoriesFilter: (categories: string[]) => void; 
}

export const useCategoryFilterStore = create<CategoryFilterStore>((set) => ({
  categoriesFilter: [],

  setCategoriesFilter: (categories) => set({ categoriesFilter: categories }),
}));
