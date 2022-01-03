import { useEffect, useState } from "react";
import { SearchCircleIcon } from "@heroicons/react/solid";
import { getCheckpoints } from "../../service/checkpoint";

const CheckpointTable = () => {

  const [checkpoints, setCheckpoints] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCheckpoints().then(checkpoints => {
      console.log(checkpoints);
      setCheckpoints(checkpoints);
    });
  },[]);

  const filteredCheckpoints = () => {
    if (search.length === 0) {
      return checkpoints.slice(currentPage, currentPage + 10);
    }
    const filtered = checkpoints.filter((check) =>
      check.name.toLowerCase().includes(search)
    );
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (checkpoints.filter((check) => check.name.toLowerCase().includes(search)).length > currentPage + 10) {
      setCurrentPage(currentPage + 10);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 10);
    }
  };

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  return (
    <div className="bg-white">
      <div className="pt-1">
        <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
          <section className="antialiased text-gray-600 w-full">
            <div className="flex flex-col justify-center">
              <div className="items-center pb-3 sm:relative lg:flex">
                <div className="relative">
                  <div className="absolute top-4 left-3">
                    <SearchCircleIcon className="h-6 w-6" />
                  </div>
                  <input
                    type="text"
                    className="bg-gray-100 h-14 w-full pl-12 pr-20 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
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
                              {filteredCheckpoints().map((checkpoint) => (
                                <tr key={checkpoint.name}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                    {checkpoint.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                    {checkpoint.username}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                    {checkpoint.created}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                    {checkpoint.modified}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                    <div className="dropdown inline-block relative">
                                      <button className="bg-blue-900 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                                        <span className="mr-1">Acción</span>
                                        <svg
                                          className="fill-current h-4 w-4"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                      </button>
                                      <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 z-50">
                                        <li className="">
                                          <button className="font-bold bg-gray-200 hover:bg-gray-400 py-2 px-6 block whitespace-no-wrap">
                                            Detalles
                                          </button>
                                        </li>
                                        <li className="">
                                          <button className="font-bold bg-gray-200 hover:bg-gray-400 py-2 px-5 block whitespace-no-wrap">
                                            Imágenes
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
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
  );
}

export default CheckpointTable;