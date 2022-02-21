import { useState, useEffect } from "react";
import InputSearch from "../common/InputSearch";
import Table from "./Table";
import Pagination from "../common/Pagination";
import { getDrivers } from "../../service/driver";
import { PlusCircleIcon } from "@heroicons/react/solid";

const DriverTable = () => {

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    setLoading(true);
    getDrivers().then(response => {
      setLoading(false);
      setDrivers(response.data);
    })
  },[])

  const filteredDrivers = () => {
    if(search.length === 0){
      return drivers.slice(currentPage, currentPage + 10);
    }
    const filtered = drivers.filter((driver) => {
      return (
        driver.lastname.toLowerCase().includes(search.toLowerCase()) ||
        driver.firstname.toLowerCase().includes(search.toLowerCase()) ||
        driver.license_number.toLowerCase().includes(search.toLowerCase())
      );
    });
    return filtered.slice(currentPage, currentPage + 10);
  }

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  const nextPage = () => {
    if(drivers.filter((driver) => {
      return (
        driver.lastname.toLowerCase().includes(search.toLowerCase()) ||
        driver.firstname.toLowerCase().includes(search.toLowerCase()) ||
        driver.license_number.toLowerCase().includes(search.toLowerCase())
      );
    }).length > currentPage + 10){
      setCurrentPage(currentPage + 10);
    }
  }

  const prevPage = () => {
    if(currentPage > 0){
      setCurrentPage(currentPage - 10);
    }
  }

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
                    Agregar Conductor
                  </button>
                </div>
                <div className="w-full mx-auto bg-white rounded-lg">
                  <div className="lg:pr-3 sm:pr-1 lg:pl-3 sm:pl-1 pb-3 dark:bg-gray-800">
                    <div className="flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-0 lg:px-5">
                          <div className="sm:rounded-lg">
                            <Table
                              filteredDrivers={filteredDrivers}
                              search={search}
                              loading={loading}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Pagination nextPage={nextPage} prevPage={prevPage} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverTable