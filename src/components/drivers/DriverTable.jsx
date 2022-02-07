import { useState } from "react";
import Pagination from "../common/Pagination";
import InputSearch from "../common/InputSearch";
import Table from "./Table";
import { ExclamationCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";

const DriverTable = () => {

  const [showModalCreateDriver, setShowModalCreateDriver] = useState(false);
  const { register, handleSubmit, formState:{errors}} = useForm();

  const openModalCreateDriver = () => {
    setShowModalCreateDriver(true);
  }

  const closeModalCreateDriver = () => {
    setShowModalCreateDriver(false);
  }

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
      {showModalCreateDriver && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-700 outline-none focus:outline-none h-100-vh">
                <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
                  <h3 className="dark:text-gray-100 text-1xl font-semibold self-center">
                    Crear Conductores
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModalCreateDriver}
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
                                  (errors.dni
                                    ? " text-red-500 dark:text-red-500"
                                    : "")
                                }
                              >
                                Documento de Identidad
                              </label>
                              <input
                                type="text"
                                autoComplete="off"
                                name="dni"
                                className={
                                  `border-2 px-3 py-3 dark:border-gray-700 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-md text-base shadow focus:outline-none focus:ring-blue-900 w-full font-bold` +
                                  (errors.dni
                                    ? "border-2 border-red-500 dark:border-red-500 focus:ring-transparent"
                                    : "")
                                }
                                style={{ transition: "all .15s ease" }}
                                {...register("dni", {
                                  required: {
                                    value: true,
                                    message: "El dni es requerido",
                                  },
                                })}
                              />
                              {errors.dni && (
                                <span className="text-red-500 text-sm font-bold flex mt-1">
                                  {errors.dni.message}{" "}
                                  <ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1" />
                                </span>
                              )}
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className={
                                  `block text-gray-700 dark:text-gray-100 text-base font-bold mb-2` +
                                  (errors.lastname ? " text-red-500 dark:text-red-500" : "")
                                }
                              >
                                Apellidos
                              </label>
                              <input
                                type="text"
                                autoComplete="off"
                                name="lastname"
                                className={
                                  `border-2 px-3 py-3 dark:border-gray-700 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-md text-base shadow focus:outline-none focus:ring w-full font-bold` +
                                  (errors.lastname
                                    ? "border-2 border-red-500 dark:border-red-500 focus:ring-transparent"
                                    : "")
                                }
                                style={{ transition: "all .15s ease" }}
                                {...register("lastname", {
                                  required: {
                                    value: true,
                                    message: "El apellido es requerido",
                                  },
                                })}
                              />
                              {errors.lastname && (
                                <span className="text-red-500 text-sm font-bold flex mt-1">
                                  {errors.lastname.message}{" "}
                                  <ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1" />
                                </span>
                              )}
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className={
                                  `block text-gray-700 dark:text-gray-100 text-base font-bold mb-2` +
                                  (errors.firstname ? " text-red-500 dark:text-red-500" : "")
                                }
                              >
                                Nombres
                              </label>
                              <input
                                type="text"
                                autoComplete="off"
                                name="firstname"
                                className={
                                  `border-2 px-3 py-3 dark:border-gray-700 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-md text-base shadow focus:outline-none focus:ring w-full font-bold` +
                                  (errors.firstname
                                    ? "border-2 border-red-500 dark:border-red-500 focus:ring-transparent"
                                    : "")
                                }
                                style={{ transition: "all .15s ease" }}
                                {...register("firstname", {
                                  required: {
                                    value: true,
                                    message: "El nombre es requerido",
                                  },
                                })}
                              />
                              {errors.firstname && (
                                <span className="text-red-500 text-sm font-bold flex mt-1">
                                  {errors.firstname.message}{" "}
                                  <ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1" />
                                </span>
                              )}
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className={
                                  `block text-gray-700 dark:text-gray-100 text-base font-bold mb-2` +
                                  (errors.license_number ? " text-red-500 dark:text-red-500" : "")
                                }
                              >
                                Número de Licencia
                              </label>
                              <input
                                type="text"
                                autoComplete="off"
                                name="license_number"
                                className={
                                  `border-2 px-3 py-3 dark:border-gray-700 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-md text-base shadow focus:outline-none focus:ring w-full font-bold` +
                                  (errors.license_number
                                    ? "border-2 border-red-500 dark:border-red-500 focus:ring-transparent"
                                    : "")
                                }
                                style={{ transition: "all .15s ease" }}
                                {...register("license_number", {
                                  required: {
                                    value: true,
                                    message:
                                      "El número de licencia es requerido",
                                  },
                                })}
                              />
                              {errors.license_number && (
                                <span className="text-red-500 text-sm font-bold flex mt-1">
                                  {errors.license_number.message}{" "}
                                  <ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1" />
                                </span>
                              )}
                            </div>
                            <div className="text-center mt-6">
                              <button
                                className={
                                  `bg-blue-900 dark:bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full` +
                                  (errors.dni ||
                                  errors.lastname ||
                                  errors.firstname ||
                                  errors.license_number
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
                  <InputSearch label="Buscar por Dni" />
                  <button
                    className="sm:ml-0 sm:mt-1 lg:ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-blue-900"
                    onClick={openModalCreateDriver}
                  >
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
                            <Table />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Pagination />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverTable;