import { ExclamationCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { getUnits, createUnit } from "../../service/unit";
import InputSearch from "../common/InputSearch";
import Pagination from "../common/Pagination";
import Table from "./Table";

const UnitTable = () => {

  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModalCreateUnit, setShowModalCreateUnit] = useState(false);
  const [search, setSearch] = useState("");
  const {register, handleSubmit, reset, formState: {errors}} = useForm();

  useEffect(() => {
    setLoading(true);
    getUnits().then((response) => {
      setLoading(false);
      setUnits(response.data);
    })
  },[]);

  const filteredDrivers = () => {
    if (search.length === 0) {
      return units.slice(currentPage, currentPage + 10);
    }
    const filtered = units.filter((unit) => {
      return (
        unit.license_plate.toLowerCase().includes(search.toLowerCase()) ||
        unit.logistic_operator.toLowerCase().includes(search.toLowerCase()) ||
        unit.provider.toLowerCase().includes(search.toLowerCase()) ||
        unit.service_type.toLowerCase().includes(search.toLowerCase())
      );
    });
    return filtered.slice(currentPage, currentPage + 10);
  };

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  const nextPage = () => {
    if (
      units.filter((unit) => {
        return (
          unit.license_plate.toLowerCase().includes(search.toLowerCase()) ||
          unit.logistic_operator.toLowerCase().includes(search.toLowerCase()) ||
          unit.provider.toLowerCase().includes(search.toLowerCase()) ||
          unit.service_type.toLowerCase().includes(search.toLowerCase())
        );
      }).length >
      currentPage + 10
    ) {
      setCurrentPage(currentPage + 10);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 10);
    }
  };

  const openModalCreateUnit = () => {
    setShowModalCreateUnit(true);
  };

  const closeModalCreateUnit = () => {
    setShowModalCreateUnit(false);
  };

  const onSubmit = (data) => {
    createUnit(data).then((response) => {
      if(response.status === 400 && response.data.license_plate){
        toast.error("😨 Esta unidad ya existe", {
          className: "font-bold",
          style: { fontFamily: "Quicksand" },
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      if(response.status === 200){
        toast.success("😎 La unidad se creó correctamente", {
          className: "font-bold",
          style: { fontFamily: "Quicksand" },
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setShowModalCreateUnit(false);
        setUnits([...units, response.data]);
        reset({
          license_plate: "",
          logistic_operator: "",
          provider: "",
          service_type: "",
        });
      }
    });
  }

  return (
    <>
      {showModalCreateUnit && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-4 max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white dark:bg-gray-700 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
                  <h3 className="dark:text-gray-100 text-1xl font-semibold self-center">
                    Crear Unidad
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModalCreateUnit}
                  >
                    <span className="bg-transparent text-gray-900 dark:text-gray-100 h-6 w-6 text-xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-100 dark:bg-gray-800">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                        <div className="flex flex-col sm:mt-0 gap-7 text-sm px-4 py-4">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative w-full mb-3">
                              <label
                                className={
                                  `block text-gray-700 dark:text-gray-100 text-base font-bold mb-2` +
                                  (errors.license_plate
                                    ? " text-red-500 dark:text-red-500"
                                    : "")
                                }
                              >
                                Número de placa
                              </label>
                              <input
                                type="text"
                                autoComplete="off"
                                name="license_plate"
                                className={
                                  `border-2 px-3 py-3 dark:border-gray-700 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-md text-base shadow focus:outline-none focus:ring-blue-900 w-full font-bold` +
                                  (errors.license_plate
                                    ? "border-2 border-red-500 dark:border-red-500 focus:ring-transparent font-bold"
                                    : "")
                                }
                                style={{ transition: "all .15s ease" }}
                                {...register("license_plate", {
                                  required: {
                                    value: true,
                                    message: "El número de placa es requerido",
                                  },
                                })}
                              />
                              {errors.license_plate && (
                                <span className="text-red-500 text-sm font-bold flex mt-1">
                                  {errors.license_plate.message}{" "}
                                  <ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1" />
                                </span>
                              )}
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className={
                                  `block text-gray-700 dark:text-gray-100 text-base font-bold mb-2` +
                                  (errors.logistic_operator
                                    ? " text-red-500 dark:text-red-500"
                                    : "")
                                }
                              >
                                Operador Logístico
                              </label>
                              <input
                                type="text"
                                autoComplete="off"
                                name="logistic_operator"
                                className={
                                  `border-2 px-3 py-3 dark:border-gray-700 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-md text-base shadow focus:outline-none focus:ring w-full font-bold` +
                                  (errors.logistic_operator
                                    ? "border-2 border-red-500 dark:border-red-500 focus:ring-transparent"
                                    : "")
                                }
                                style={{ transition: "all .15s ease" }}
                                {...register("logistic_operator", {
                                  required: {
                                    value: true,
                                    message:
                                      "El operador logistico es requerido",
                                  },
                                })}
                              />
                              {errors.logistic_operator && (
                                <span className="text-red-500 text-sm font-bold flex mt-1">
                                  {errors.logistic_operator.message}{" "}
                                  <ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1" />
                                </span>
                              )}
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className={
                                  `block text-gray-700 dark:text-gray-100 text-base font-bold mb-2` +
                                  (errors.provider
                                    ? " text-red-500 dark:text-red-500"
                                    : "")
                                }
                              >
                                Proveedor
                              </label>
                              <input
                                type="text"
                                autoComplete="off"
                                name="provider"
                                className={
                                  `border-2 px-3 py-3 dark:border-gray-700 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-md text-base shadow focus:outline-none focus:ring w-full font-bold` +
                                  (errors.provider
                                    ? "border-2 border-red-500 dark:border-red-500 focus:ring-transparent"
                                    : "")
                                }
                                style={{ transition: "all .15s ease" }}
                                {...register("provider", {
                                  required: {
                                    value: true,
                                    message: "El proveedor es requerido",
                                  },
                                })}
                              />
                              {errors.provider && (
                                <span className="text-red-500 text-sm font-bold flex mt-1">
                                  {errors.provider.message}{" "}
                                  <ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1" />
                                </span>
                              )}
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className={
                                  `block text-gray-700 dark:text-gray-100 text-base font-bold mb-2` +
                                  (errors.service_type
                                    ? " text-red-500 dark:text-red-500"
                                    : "")
                                }
                              >
                                Tipo de servicio
                              </label>
                              <input
                                type="text"
                                autoComplete="off"
                                name="service_type"
                                className={
                                  `border-2 px-3 py-3 dark:border-gray-700 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-md text-base shadow focus:outline-none focus:ring w-full font-bold` +
                                  (errors.service_type
                                    ? "border-2 border-red-500 dark:border-red-500 focus:ring-transparent"
                                    : "")
                                }
                                style={{ transition: "all .15s ease" }}
                                {...register("service_type", {
                                  required: {
                                    value: true,
                                    message: "El tipo de servicio es requerido",
                                  },
                                })}
                              />
                              {errors.service_type && (
                                <span className="text-red-500 text-sm font-bold flex mt-1">
                                  {errors.service_type.message}{" "}
                                  <ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1" />
                                </span>
                              )}
                            </div>
                            <div className="text-center mt-6">
                              <button
                                className={
                                  `bg-blue-900 dark:bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full` +
                                  (errors.license_plate ||
                                  errors.logistic_operator ||
                                  errors.provider ||
                                  errors.service_type
                                    ? " opacity-50 cursor-not-allowed"
                                    : "")
                                }
                                type="submit"
                                style={{ transition: "all .15s ease" }}
                              >
                                Guardar
                              </button>
                            </div>
                          </form>
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
                  <button
                    className="sm:ml-0 sm:mt-1 lg:ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-blue-900"
                    onClick={openModalCreateUnit}
                  >
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
                              filteredUnits={filteredDrivers}
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
      <ToastContainer />
    </>
  );
}

export default UnitTable;