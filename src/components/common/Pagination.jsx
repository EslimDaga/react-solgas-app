const Pagination = ({ prevPage, nextPage }) => {
  return (
    <div className="pb-3 dark:bg-gray-800">
      <button
        className="bg-blue-900 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={prevPage}
      >
        Anterior
      </button>
      <button
        className="bg-blue-900 text-white font-bold py-2 px-4 rounded"
        onClick={nextPage}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;