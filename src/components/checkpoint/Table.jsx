import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import NoResultsFound from "../common/NoResultsFound";

const Table = ({ filteredCheckpoints, openModalViewCheckpoint, search }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-blue-900 dark:bg-gray-900">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Nombre
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
            Fecha de Modificación
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
        {filteredCheckpoints().map((checkpoint) => (
          <tr key={checkpoint.name}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
              {checkpoint.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
              {checkpoint.username}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
              {checkpoint.created}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
              {checkpoint.modified}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-900">
                    Acción
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-50 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1 bg-gray-100 dark:bg-gray-800">
                      <Menu.Item>
                        <button
                          className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full block px-4 py-2 text-sm"
                          onClick={() =>
                            openModalViewCheckpoint(checkpoint.name, true)
                          }
                        >
                          Ver
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full block px-4 py-2 text-sm">
                          Eliminar
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </td>
          </tr>
        ))}
        {search.length > 0 && filteredCheckpoints().length === 0 ? (
          <NoResultsFound />
        ) : null}
      </tbody>
    </table>
  );
};

export default Table;