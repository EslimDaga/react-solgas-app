import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import Dropdown from "../common/Dropdown";
import NoResultsFound from "../common/NoResultsFound";

const Table = ({filteredEvents, openModal, openModalImages, search, loading }) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="w-full mx-auto bg-white rounded-lg">
        <div className="lg:pr-3 sm:pr-1 lg:pl-3 sm:pl-1 pb-3">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-0 lg:px-5">
                <div className="sm:rounded-lg">
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
                            <Dropdown
                              openModal={openModal}
                              openModalImages={openModalImages}
                              vent={event}
                            />
                          </td>
                        </tr>
                      ))}
                      {search.length > 0 && filteredEvents().length === 0 ? (
                        <NoResultsFound />
                      ) : null}
                      {search.length === 0 &&
                        filteredEvents().length === 0 &&
                        (!loading ? (
                          <tr>
                            <td colSpan="7" className="text-center p-2">
                              <h2 className="font-bold">
                                Aún no hiciste una busqueda. 🤔
                              </h2>
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center p-10">
                              <h2 className="font-bold">Cargando... 🤗</h2>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
