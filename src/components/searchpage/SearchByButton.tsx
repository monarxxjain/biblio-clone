import React from "react";
interface SearchByButtonProps {
  setQueryType: React.Dispatch<React.SetStateAction<string>>;
  queryType: string;
  value: string;
  text: string;
}

const SearchByButton: React.FC<SearchByButtonProps> = (props) => {
  return (
    <button
      onClick={() => {
        props.setQueryType(props.value);
      }}
      className={
        props.queryType === props.value
          ? "py-0.5 px-1 m-2 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-300 dark:bg-rose-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-gray-300 transition duration-300 delay-40 hover:delay-40 ring ring-rose-600"
          : "py-0.5 px-1 m-2 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 transition duration-300 delay-40 hover:delay-40 ring ring-gray-300 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
      }
    >
      {props.text}
    </button>
  );
};

export default SearchByButton;
