import InputSearch from "../common/InputSearch";
import Pagination from "../common/Pagination";
import Table from "./Table";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { retrieveUnits } from "../../store/actions/Units";
import LoadingDataInTable from "../common/LoadingDataInTable";

const UnitTable = () => {

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const units = useSelector((state) => state.units);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUnits());
  }, [dispatch]);

  const filteredUnits = () => {
    if (search.length === 0) {
      return units.units.slice(currentPage, currentPage + 10);
    }
    const filtered = units.units.filter((unit) => {
      return (
        unit.license_plate.toLowerCase().includes(search.toLowerCase()) ||
        unit.logistic_operator.toLowerCase().includes(search.toLowerCase()) ||
        unit.provider.toLowerCase().includes(search.toLowerCase()) ||
        unit.service_type.toLowerCase().includes(search.toLowerCase())
      );
    });
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (currentPage + 10 < units.units.length) {
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
    <>
      <div className="bg-white dark:bg-gray-800">
        <div className="pt-1">
          <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
            <section className="antialiased text-gray-600 w-full">
              <div className="flex flex-col justify-center">
                <div className="items-center pb-3 flex sm:flex lg:flex justify-between">
                  <InputSearch
                    label="Buscar"
                    search={search}
                    onSearchChange={onSearchChange}
                  />
                  <button className="sm:ml-0 sm:mt-1 lg:ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-blue-900">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Agregar Unidad
                  </button>
                </div>
                <div className="w-full mx-auto bg-white rounded-lg">
                  <div className="lg:pr-3 sm:pr-1 lg:pl-3 sm:pl-1 pb-3 dark:bg-gray-800">
                    <div className="flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-0 lg:px-5">
                          <div className="sm:rounded-lg">
                            <Table
                              filteredUnits={filteredUnits}
                              search={search}
                            />
                            {units.loading && <LoadingDataInTable />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Pagination prevPage={prevPage} nextPage={nextPage} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default UnitTable;