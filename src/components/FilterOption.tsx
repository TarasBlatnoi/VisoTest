import { useState } from "react";

interface IFilterOptionProps {
  text: string;
  callBack: (checked: boolean) => void;
}

function FilterOption({ text, callBack }: IFilterOptionProps) {
  const [checked, setChecked] = useState(false);
  return (
    <li className="cursor-pointer ">
      <input
        id={text}
        type="checkbox"
        onChange={(ev) => {
          callBack?.(ev.target.checked);
          setChecked(ev.target.checked);
        }}
        checked={checked}
      />
      <label htmlFor={text} className="cursor-pointer">
        {text}
      </label>
    </li>
  );
}

export default FilterOption;
