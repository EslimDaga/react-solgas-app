import { useEffect, useState } from "react";
import { getEvents } from "../../service/event";
import { SearchCircleIcon } from "@heroicons/react/solid"

const EventTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(events => {
      setIsLoading(false);
      setEvents(events);
    })
  },[]);

  const filteredEvents = () => {
    if(search.length === 0){
      return events.slice(currentPage, currentPage + 10);
    }
    //If there is something in the text box
    const filtered = events.filter(eve => eve.unitid.toLowerCase().includes(search));
    return filtered.slice(currentPage, currentPage + 10);
  }

  const nextPage = () => {
    if(events.filter(eve => eve.unitid.toLowerCase().includes(search)).length > currentPage + 10){
      setCurrentPage(currentPage + 10);
    }
  }

  const prevPage = () => {
    if(currentPage > 0) {
      setCurrentPage(currentPage - 10);
    }
  }

  const onSearchChange = ({target}) => {
    setCurrentPage(0);
    setSearch(target.value);
  }

  return (
  <>
    <div className="bg-white">
      <div className="pt-1">
        <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
          <section className="antialiased text-gray-600 w-full">
            <div className="flex flex-col justify-center">
              <div className="container flex items-center pb-3">
                <div className="relative">
                  <div className="absolute top-4 left-3">
                    <SearchCircleIcon className="h-6 w-6"/>
                  </div>
                  <input
                    type="text"
                    className="bg-gray-100 h-14 w-96 pl-12 pr-20 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                    placeholder="Buscar por Unidad"
                    value={search}
                    onChange={onSearchChange}
                  />
                </div>
              </div>
              <div className="w-full mx-auto bg-white rounded-lg">
                <div className="lg:pr-3 sm:pr-1 lg:pl-3 sm:pl-1 pb-3">
                  <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-0 lg:px-5">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {filteredEvents().map((event) => (
                                <tr key={event.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.provider}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.logistic_operator}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.unitid}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.type_of_service}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.checkpoint}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.driver_fullname}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.datetime}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {isLoading && <h1>Cargando</h1>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
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
          </section>
        </div>
      </div>
    </div>
  </>
  )
}

export default EventTable;