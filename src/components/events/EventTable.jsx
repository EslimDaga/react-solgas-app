import { useEffect, useState } from "react";
import { getEvents } from "../../service/event";

const EventTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(events => {
      setIsLoading(false);
      setEvents(events);
    })
  },[]);
  return (
  <>
    <div className="bg-white">
      <div className="pt-1">
        <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
          <section className="antialiased bg-gray-100 text-gray-600 w-full">
            <div className="flex flex-col justify-center">
              <div className="w-full mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="pr-3 pl-3">
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
                              {isLoading && <h1>Cargando</h1>}
                              {events.map((event) => (
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </>
  )
}

export default EventTable;