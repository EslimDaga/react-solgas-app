import { Menu } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/solid";
import LoadingDataInTable from "../common/LoadingDataInTable";
import NoResultsFound from "../common/NoResultsFound";

const Table = ({ filteredUnits, search, loading, handleDeleteUnit, is_staff }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-blue-900 dark:bg-gray-900">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Placa
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Operador logístico
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Proveedor
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Tipo de Servicio
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Usuario
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Fecha de Creación
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Acciones
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
          filteredUnits().map((unit) => (
            <tr key={unit.license_plate}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {unit.license_plate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {unit.logistic_operator}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {unit.provider}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {unit.service_type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {unit.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {unit.created}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <button
                      disabled={!is_staff}
                      className={`inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-red-600 dark:bg-red-600 text-sm font-bold text-gray-100 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-red-900` + (!is_staff ? " opacity-50 cursor-not-allowed" : "")}
                      onClick={() => handleDeleteUnit(unit.license_plate)}
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
        {search.length > 0 && filteredUnits().length === 0 ? (
          <NoResultsFound />
        ) : null}
      </tbody>
    </table>
  );
};

export default Table;