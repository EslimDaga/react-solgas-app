const LoadingDataInTable = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 flex justify-center items-center">
        <div className="w-3/5 bg-green-100 dark:bg-gray-600 rounded-lg shadow-sm p-5 border-dashed border border-green-500 flex flex-col  justify-between items-center gap-2 sm:gap-0">
          <div className="flex flex-col sm:flex-row justify-start items-center">
            <div className="flex rounded-md">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-gray-900 dark:text-gray-100 font-bold tracking-wider">
                Cargando...
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingDataInTable;