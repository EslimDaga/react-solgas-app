import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { getCheckpoinByName, getCheckpoints } from "../../service/checkpoint";
import { render } from "@testing-library/react";
import { css, Global } from "@emotion/react";
import cache from "../../helpers/cache";
import InputSearch from "../common/InputSearch";
import Table from "./Table";
import LoadingDataInTable from "../common/LoadingDataInTable";

render(
  <Global
    styles={css`
      .h-100-vh {
        width: 100vh;
      }
    `}
  />
);

const CheckpointTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [checkpoint, setCheckpoint] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [showModalCreateCheckpoint, setShowModalCreateCheckpoint] = useState(false);
  const [showModalViewCheckpoint, setShowModalViewCheckpoint] = useState(false);

  const token = cache.getItem("user").token;

  useEffect(() => {
    getCheckpoints().then(checkpoints => {
      setIsLoading(false);
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

  const openModalCreateCheckpoint = () => {
    setShowModalCreateCheckpoint(true);
  }

  const closeModalCreateCheckpoint = () => {
    setShowModalCreateCheckpoint(false);
  }

  const openModalViewCheckpoint = (name, state) => {
    getCheckpoinByName(name).then(checkpoint => {
      setCheckpoint(checkpoint);
      setShowModalViewCheckpoint(state);
    }).catch(e => {
      console.log(e)
    })
  }

  const closeModalViewCheckpoint = () => {
    setShowModalViewCheckpoint(false);
  }

  return (
    <>
      {showModalCreateCheckpoint && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-100-vh">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-1xl font-semibold self-center">
                    Detalles del Evento
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModalCreateCheckpoint}
                  >
                    <span className="bg-transparent text-gray-900 h-6 w-6 text-xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-100">
                    <div className="bg-white rounded-lg shadow-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                        <div className="flex flex-col sm:mt-0 gap-7 text-sm">
                          <iframe
                            id="inlineFrameExample"
                            title="Inline Frame Example"
                            width="100%"
                            height="770px"
                            src={`http://checkpoint.segursat.com/api/create-checkpoint/${token}`}
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      {showModalViewCheckpoint && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-100-vh">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-1xl font-semibold self-center">
                    Detalles del Evento
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModalViewCheckpoint}
                  >
                    <span className="bg-transparent text-gray-900 h-6 w-6 text-xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-100">
                    <div className="bg-white rounded-lg shadow-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                        <div className="flex flex-col sm:mt-0 gap-7 text-sm">
                          <iframe
                            id="inlineFrameExample"
                            title="Inline Frame Example"
                            width="100%"
                            height="698px"
                            src={`http://checkpoint.segursat.com/api/get-checkpoint/${checkpoint.name}/${token}`}
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      <div className="bg-white">
        <div className="pt-1">
          <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
            <section className="antialiased text-gray-600 w-full">
              <div className="flex flex-col justify-center">
                <div className="items-center pb-3 flex sm:flex lg:flex justify-between">
                  <InputSearch
                    search={search}
                    onSearchChange={onSearchChange}
                    label="Buscar por Nombre"
                  />
                  <button
                    className="sm:ml-0 sm:mt-1 lg:ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-blue-900"
                    onClick={openModalCreateCheckpoint}
                  >
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Agregar Checkpoint
                  </button>
                </div>
                <div className="w-full mx-auto bg-white rounded-lg">
                  <div className="lg:pr-3 sm:pr-1 lg:pl-3 sm:pl-1 pb-3">
                    <div className="flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-0 lg:px-5">
                          <div className="sm:rounded-lg">
                            <Table
                              filteredCheckpoints={filteredCheckpoints}
                              openModalViewCheckpoin={openModalViewCheckpoint}
                              search={search}
                            />
                            {isLoading && (<LoadingDataInTable />)}
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
  );
}

export default CheckpointTable;