import { SearchCircleIcon } from "@heroicons/react/solid";

const InputSearch = ({search, onSearchChange}) => {
  return (
    <div className="items-center pb-3 sm:relative lg:flex">
      <div className="relative">
        <div className="absolute top-4 left-3">
          <SearchCircleIcon className="h-6 w-6" />
        </div>
        <input
          type="text"
          className="bg-gray-100 h-14 w-full pl-12 pr-20 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
          placeholder="Buscar por Unidad"
          value={search}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
}

export default InputSearch;