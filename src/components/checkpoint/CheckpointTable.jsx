import { SearchCircleIcon } from "@heroicons/react/solid";

const CheckpointTable = () => {
  return (
    <div className="bg-white">
      <div className="pt-1">
        <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
          <section className="antialiased text-gray-600 w-full">
            <div className="flex flex-col justify-center">
              <div className="items-center pb-3 sm:relative lg:flex">
                <div className="relative">
                  <div className="absolute top-4 left-3">
                    <SearchCircleIcon className="h-6 w-6"/>
                  </div>
                  <input
                    type="text"
                    className="bg-gray-100 h-14 w-full pl-12 pr-20 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                    placeholder="Buscar por Unidad"
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
                            <tbody className="bg-white divide-y divide-gray-200">
                            </tbody>
                          </table>
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
              >
                Anterior
              </button>
              <button
                className="bg-blue-900 text-white font-bold py-2 px-4 rounded"
              >
                Siguiente
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CheckpointTable;