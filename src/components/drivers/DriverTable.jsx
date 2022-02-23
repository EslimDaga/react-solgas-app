import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import InputSearch from "../common/InputSearch";
import Table from "./Table";
import Pagination from "../common/Pagination";
import { createDriver, deleteDriver, getDrivers } from "../../service/driver";
import { PlusCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { ThemeContext } from "../../store/context/ThemeContext";

const DriverTable = () => {

  const { theme } = useContext(ThemeContext);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [showModalCreateDriver, setShowModalCreateDriver] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [updateDrivers, setUpdateDrivers] = useState(false);
  const {register, handleSubmit, reset, formState: {errors}} = useForm();

  useEffect(() => {
    setLoading(true);
    getDrivers().then((response) => {
      setLoading(false);
      setDrivers(response.data);
    });
  }, [updateDrivers]);

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
  };

  const prevPage = () => {
    if(currentPage > 0){
      setCurrentPage(currentPage - 10);
    }
  };

  const openModalCreateDriver = () => {
    setShowModalCreateDriver(true);
  }

  const closeModalCreateDriver = () => {
    setShowModalCreateDriver(false);
  }

  const onSubmit = (data) => {
    createDriver(data).then(response => {
      if(response.status === 400 && response.data.dni){
        toast.error("😨 Este dni ya existe", {
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

      if(response.status === 400 && response.data.license_number){
        toast.error("😨 Esta licencia ya existe", {
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
        toast.success("😎 El conductor se creó correctamente", {
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
        setShowModalCreateDriver(false);
        setDrivers([...drivers, response.data]);
        reset({
          dni: "",
          firstname: "",
          lastname: "",
          license_number: "",
        });
      }
    })
  }

  const handleDelete = (driver) => {
    if (theme === "dark") {
      Swal.fire({
        title: "¿Esta seguro de eliminar este conductor?",
        text: "Una vez eliminado no podrá recuperarlo",
        icon: "question",
        showDenyButton: true,
        confirmButtonColor: "#1E3A8A",
        confirmButtonText: "Si, Eliminar",
        background: "#1F2937",
        color: "#FFFFFF",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteDriver(driver).then(() => {
            Swal.fire({
              title: "Se elimino al conductor",
              text: "Se elimino al conductor correctamente",
              icon: "success",
              confirmButtonColor: "#1E3A8A",
              confirmButtonText: "Ok",
              background: "#1F2937",
              color: "#FFFFFF",
            });
          });
          setUpdateDrivers(!updateDrivers);
        } else if (result.isDenied) {
          Swal.fire({
            title: "No se elimino al conductor",
            text: "No se borro ningun dato",
            icon: "info",
            confirmButtonColor: "#1E3A8A",
            confirmButtonText: "Ok",
            background: "#1F2937",
            color: "#FFFFFF",
          });
        }
      });
    }else{
      Swal.fire({
        title: "¿Esta seguro de eliminar este conductor?",
        text: "Una vez eliminado no podrá recuperarlo",
        icon: "question",
        showDenyButton: true,
        iconColor: "#1E3A8A",
        confirmButtonColor: "#1E3A8A",
        confirmButtonText: "Si, Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteDriver(driver).then(() => {
            Swal.fire({
              title: "Se elimino al conductor",
              text: "Se elimino al conductor correctamente",
              icon: "success",
              confirmButtonColor: "#1E3A8A",
              confirmButtonText: "Ok",
              background: "#FFFFFF",
              color: "#000000",
            });
          });
          setUpdateDrivers(!updateDrivers);
        } else if (result.isDenied) {
          Swal.fire({
            title: "No se elimino al conductor",
            text: "No se borro ningun dato",
            icon: "info",
            iconColor: "#1E3A8A",
            confirmButtonColor: "#1E3A8A",
            confirmButtonText: "Ok",
            background: "#FFFFFF",
            color: "#000000",
          });
        }
      });
    }
  }

  return (
    <>
      {showModalCreateDriver && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-4 max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white dark:bg-gray-700 outline-none focus:outline-none">
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
                                    ? "border-2 border-red-500 dark:border-red-500 focus:ring-transparent font-bold"
                                    : "")
                                }
                                style={{ transition: "all .15s ease" }}
                                {...register("dni", {
                                  required: {
                                    value: true,
                                    message: "El dni es requerido",
                                  },
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message:
                                      "El dni debe tener solo números y 8 caracteres",
                                  },
                                  minLength: {
                                    value: 8,
                                    message: "El dni debe tener 8 caracteres",
                                  },
                                  maxLength: {
                                    value: 8,
                                    message: "El dni debe tener 8 caracteres",
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
                                  (errors.lastname
                                    ? " text-red-500 dark:text-red-500"
                                    : "")
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
                                  pattern: {
                                    value: /^[a-z A-Z]+$/,
                                    message:
                                      "El apellido debe tener solo letras",
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
                                  (errors.firstname
                                    ? " text-red-500 dark:text-red-500"
                                    : "")
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
                                  pattern: {
                                    value: /^[a-z A-Z]+$/,
                                    message: "El nombre debe tener solo letras",
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
                                  (errors.license_number
                                    ? " text-red-500 dark:text-red-500"
                                    : "")
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
                  <InputSearch
                    label="Buscar"
                    search={search}
                    onSearchChange={onSearchChange}
                  />
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
                            <Table
                              filteredDrivers={filteredDrivers}
                              handleDelete={handleDelete}
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

export default DriverTable;