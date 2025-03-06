import { ICategory } from "../types/Category.type";
import { useEffect } from "react";
import FilterOption from "./FilterOption";
import { useCategoryFilterStore } from "../store/categoryStore";

interface FilterProps {
  categories: ICategory[] | undefined;
}

function Filter({ categories }: FilterProps) {
  const { categoriesFilter, setCategoriesFilter } = useCategoryFilterStore();
  useEffect(() => {
    setCategoriesFilter([]);
  }, [categories, setCategoriesFilter]);
  return (
    <div className="flex flex-col w-[50%] bg-yellow-500 p-4 ml-auto h-[70vh] ">
      <ul className="flex flex-col gap-4 justify-between h-full">
        {categories?.map((category) => {
          return (
            <FilterOption
              key={category.idCategory}
              text={category.strCategory}
              callBack={(checked: boolean) => {
                if (checked) {
                  setCategoriesFilter([
                    ...categoriesFilter,
                    category.strCategory,
                  ]);
                } else {
                  setCategoriesFilter(
                    categoriesFilter.filter(
                      (cat) => cat !== category.strCategory
                    )
                  );
                }
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Filter;
