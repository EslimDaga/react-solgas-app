import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { getCheckpoinByName, getCheckpoints } from "../../service/checkpoint";
import { render } from "@testing-library/react";
import { css, Global } from "@emotion/react";
import cache from "../../helpers/cache";
import InputSearch from "../common/InputSearch";
import Table from "./Table";
import LoadingDataInTable from "../common/LoadingDataInTable";
import ModalCreateCheckpoint from "./ModalCreateCheckpoint";
import ModalViewCheckpoint from "./ModalViewCheckpoint";
import Pagination from "../common/Pagination";

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
        <ModalCreateCheckpoint
          closeModalCreateCheckpoint={closeModalCreateCheckpoint}
          token={token}
        />
      )}
      {showModalViewCheckpoint && (
        <ModalViewCheckpoint
          closeModalViewCheckpoint={closeModalViewCheckpoint}
          checkpoint={checkpoint}
          token={token}
        />
      )}
      <div className="bg-white dark:bg-gray-800">
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
                              openModalViewCheckpoint={openModalViewCheckpoint}
                              search={search}
                            />
                            {isLoading && <LoadingDataInTable />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Pagination prevPage={prevPage} nextPage={nextPage}/>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckpointTable;