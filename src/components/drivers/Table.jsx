import { Menu } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/solid";
import NoResultsFound from "../common/NoResultsFound";
import LoadingDataInTable from "../common/LoadingDataInTable";

const Table = ({ filteredDrivers, handleDelete, search, loading }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-blue-900 dark:bg-gray-900">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Dni
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Apellidos
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Nombres
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Número de Licencia
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Accioness
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
        {loading ? (
          <tr>
            <td colSpan="8">
              <LoadingDataInTable />
            </td>
          </tr>
        ) : (
          filteredDrivers().map((driver) => (
            <tr key={driver.dni}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {driver.dni}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {driver.lastname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {driver.firstname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {driver.license_number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <button
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-red-600 dark:bg-red-600 text-sm font-bold text-gray-100 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-red-900"
                      onClick={() => handleDelete(driver.dni)}
                    >
                      Eliminar
                      <TrashIcon
                        className="-mr-1 ml-1 h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Menu>
              </td>
            </tr>
          ))
        )}
        {search.length > 0 && filteredDrivers().length === 0 ? (
          <NoResultsFound />
        ) : null}
      </tbody>
    </table>
  );
};

export default Table;