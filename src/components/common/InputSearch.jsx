import { SearchCircleIcon } from "@heroicons/react/solid";

const InputSearch = ({search, onSearchChange, label}) => {
  return (
    <div className="items-center pb-3 sm:relative lg:flex">
      <div className="relative">
        <div className="absolute top-4 left-3">
          <SearchCircleIcon className="h-6 w-6 dark:text-gray-100" />
        </div>
        <input
          type="text"
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 dark:placeholder:text-gray-100 h-14 w-full pl-12 pr-20 rounded-lg z-50 font-bold"
          placeholder={label}
          value={search}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
}

export default InputSearch;