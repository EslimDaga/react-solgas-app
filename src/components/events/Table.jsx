import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import NoResultsFound from "../common/NoResultsFound";

const Table = ({filteredEvents, openModal, openModalImages, search}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-blue-900">
        <tr>
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
            Operador Logistico
          </th>
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
            Tipo de Servicio
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Checkpoint
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Nombre del Conductor
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
            Ver detalles
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredEvents().map((event) => (
          <tr key={event.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
              {event.provider}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
              {event.logistic_operator}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
              {event.unitid}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
              {event.type_of_service}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
              {event.checkpoint}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
              {event.driver_fullname}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
              {event.datetime}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-900">
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-0 w-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-0">
                      <Menu.Item>
                        <button
                          className="bg-gray-100 text-gray-900 w-full block px-4 py-2 text-sm"
                          onClick={() => openModal(event.id, true)}
                        >
                          Detalles
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          className="bg-gray-100 text-gray-900 w-full block px-4 py-2 text-sm"
                          onClick={() => openModalImages(event.id, true)}
                        >
                          Imágenes
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </td>
          </tr>
        ))}
        {search.length > 0 && filteredEvents().length === 0 ? (
          <NoResultsFound />
        ) : null}
      </tbody>
    </table>
  );
}

export default Table;