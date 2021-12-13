import Breadcrumb from "../../components/common/Breadcrumb";
import Header from "../../components/Header";

const EventPage = () => {
  return (
    <>
      <Header/>
      <Breadcrumb title="Eventos"/>
      <div className="bg-white">
        <div className="pt-1">
          <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
            <section className="antialiased bg-gray-100 text-gray-600 w-full">
              <div className="flex flex-col justify-center">
                <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                  <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">Eventos</h2>
                  </header>
                  <div className="p-3">
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                          <tr>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-bold">Proveedor</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-bold">Operador Logistico</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-bold">Placa</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-bold">Tipo de Servicio</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-bold">Checkpoint</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-bold">Nombre del Conductor</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-bold">Fecha de Creación</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                          <tr>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center">SEGURSAT</div>
                            </td>
                            <td className="p-2 whitespace-nowrap ">
                              <div className="text-center">JEVARO</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center">BCO-875</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center">GRANEL</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center">CHECK POINT PPAL</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center">CABRERA CAMPOS, SALOMON</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center">13/12/2021 04:56 am</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

export default EventPage;