import { useEffect, useState } from "react";
import { getUnits, getSearchEvents } from "../../service/history";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import ReactDatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { SearchCircleIcon } from "@heroicons/react/outline";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/styles/css/history/style.css";

const HistoryPage = () => {
  const { handleSubmit, formState : {errors}, control } = useForm();
  const [allUnits, setAllUnits] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchEvents, setSearchEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUnits().then(units => {
      const optionAllUnits = [{ value: "ALL", label: "Todos" }];
      const optionsUnits = units.map(unit => (
        {
          value: unit.license_plate,
          label: unit.license_plate
        }
      ));
      const total = optionAllUnits.concat(optionsUnits);
      setAllUnits(total);
    });
  },[]);

  const filteredEvents = () => {
    if(search.length === 0){
      return searchEvents.slice(currentPage, currentPage + 10);
    }
    const filtered = searchEvents.filter(eve => eve.driver_fullname.toLowerCase().includes(search));
    return filtered.slice(currentPage, currentPage + 10);
  }

  const nextPage = () => {
    if(searchEvents.filter(eve => eve.driver_fullname.toLowerCase().includes(search)).length > currentPage + 10){
      setCurrentPage(currentPage + 10);
    }
  }

  const prevPage = () => {
    if(currentPage > 0) {
      setCurrentPage(currentPage - 10);
    }
  }

  const onSearchChange = ({target}) => {
    setCurrentPage(0);
    setSearch(target.value);
  }

  const onSubmitForm = async(data) => {
    setLoading(true);
    const unit_name_value = data.unit_name.value;
    const initial_date_value = moment(data.initial_date).format("YYYY-MM-DD");
    const final_date_value = moment(data.final_date).format("YYYY-MM-DD");
    await getSearchEvents(initial_date_value,final_date_value,unit_name_value).then(events => {
      if(events.length === 0){
        toast.error("🧐 No se hay resutados", {
          className: "font-bold",
          style: { fontFamily: 'Quicksand' },
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setSearchEvents(events);
      setLoading(false);
    })
  }

  return (
  <>
    <Header/>
    <Breadcrumb title="Historial"/>
    <div className="bg-white">
      <div className="pt-1">
        <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
          <section className="antialiased text-gray-600 w-full">
            <div className="flex flex-col justify-center">
              <div className="items-center pb-3 sm:relative lg:flex justify-between">
                <form onSubmit={handleSubmit(onSubmitForm)} className="mx-1 lg:flex">
                  <div className="relative w-full md:w-full sm:mb-2">
                    <label className="block text-gray-700 text-base font-bold mb-2 ml-2">
                      Fecha Inicial
                    </label>
                    <div className="relative">
                      <Controller
                        as={ReactDatePicker}
                        control={control}
                        valueName="selected"
                        onChange={([selected]) => selected}
                        name="initial_date"
                        className="input"
                        rules={{
                          required: true,
                        }}
                        render={({field}) => (
                          <ReactDatePicker
                            className="bg-gray-200 h-14 w-full pl-4 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                            selected={field.value}
                            //onChange={(date) => setStartDate(date)}
                            onChange={(date) => field.onChange(date)}
                            placeholderText="Seleccionar Fecha"
                          />
                        )}
                      />
                      {errors.initial_date && <span className="text-red-500 text-sm font-bold flex mt-1">Este campo es requerido</span>}
                    </div>
                  </div>
                  <div className="relative w-full md:w-full sm:mb-2">
                    <label className="block text-gray-700 text-base font-bold mb-2 lg:ml-2">
                      Fecha Final
                    </label>
                    <div className="relative lg:ml-2">
                      <Controller
                        control={control}
                        valueName="selected"
                        onChange={([selected]) => selected}
                        name="final_date"
                        className="input"
                        rules={{
                          required: true,
                        }}
                        render={({field}) => (
                          <ReactDatePicker
                            className="bg-gray-200 h-14 w-full pl-4 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            placeholderText="Seleccionar Fecha"
                          />
                        )}
                      />
                      {errors.final_date && <span className="text-red-500 text-sm font-bold flex mt-1">Este campo es requerido</span>}
                    </div>
                  </div>
                  <div className="relative w-full md:w-full">
                    <label className="block text-gray-700 text-base font-bold mb-2 lg:ml-2">
                      Unidades
                    </label>
                    <div className="relative lg:ml-2">
                      <Controller
                        name="unit_name"
                        isClearable
                        rules={{
                          required: true,
                          message: "Este campo es requerido"
                        }}
                        control={control}
                        render={({field}) => (
                          <ReactSelect
                            {...field}
                            isClearable
                            placeholder="Buscar Unidad"
                            className="bg-gray-200 w-full rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                            options={allUnits}
                          />
                        )}
                      />
                      {errors.unit_name && <span className="text-red-500 text-sm font-bold flex mt-1">Este campo es requerido</span>}
                    </div>
                  </div>
                  <div className={`text-center self-center lg:ml-2 sm:mt-4 lg:mt-8` + (errors.initial_date || errors.final_date || errors.unit_name ? " self-center lg:mt-2": "")}>
                    <button
                      className={`bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full` + (errors.initial_date || errors.final_date || errors.unit_name ? " opacity-50 cursor-not-allowed" : "")}
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      <div className="inline-flex items-center">
                      Enviar
                      </div>
                    </button>
                  </div>
                </form>
                <div className="flex flex-col">
                  <label className="block text-gray-700 text-base font-bold mb-2 ml-2">
                    Buscar por Conductor
                  </label>
                  <div className="relative">
                    <div className="absolute top-4 left-3">
                      <SearchCircleIcon className="h-6 w-6"/>
                    </div>
                    <input
                      type="text"
                      className="bg-gray-100 h-14 w-full pl-12 pr-20 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                      placeholder="Buscar..."
                      value={search}
                      onChange={onSearchChange}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white">
                <div className="pt-1">
                  <div className="mx-auto flex items-center space-x-2 sm:px-3 lg:max-w-full lg:px-0">
                    <section className="antialiased text-gray-600 w-full">
                      <div className="flex flex-col justify-center">
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
                                            Proveedor
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Operador Logistico
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Placa
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Tipo de Servicio
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Checkpoint
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Nombre del Conductor
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
                                            Ver detalles
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                          filteredEvents().map((event) => (
                                          <tr key={event.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.provider}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.logistic_operator}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.unitid}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.type_of_service}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.checkpoint}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.driver_fullname}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.datetime}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                              <div className="dropdown inline-block relative">
                                                <button className="bg-blue-900 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                                                  <span className="mr-1">Acción</span>
                                                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                  </svg>
                                                </button>
                                                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 z-50">
                                                  <li className="">
                                                    <button
                                                      className="font-bold bg-gray-200 hover:bg-gray-400 py-2 px-6 block whitespace-no-wrap"
                                                    >
                                                    Detalles
                                                    </button>
                                                  </li>
                                                  <li className="">
                                                    <button
                                                      className="font-bold bg-gray-200 hover:bg-gray-400 py-2 px-5 block whitespace-no-wrap"
                                                    >
                                                    Imágenes
                                                    </button>
                                                  </li>
                                                </ul>
                                              </div>
                                            </td>
                                          </tr>
                                          ))
                                        }
                                        {
                                          search.length > 0 && filteredEvents().length === 0 && (
                                            filteredEvents() > 1 ? filteredEvents().map((event) => (
                                              <tr key={event.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.provider}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.logistic_operator}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.unitid}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.type_of_service}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.checkpoint}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.driver_fullname}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{event.datetime}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                                  <div className="dropdown inline-block relative">
                                                    <button className="bg-blue-900 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                                                      <span className="mr-1">Acción</span>
                                                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                      </svg>
                                                    </button>
                                                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 z-50">
                                                      <li className="">
                                                        <button
                                                          className="font-bold bg-gray-200 hover:bg-gray-400 py-2 px-6 block whitespace-no-wrap"
                                                        >
                                                        Detalles
                                                        </button>
                                                      </li>
                                                      <li className="">
                                                        <button
                                                          className="font-bold bg-gray-200 hover:bg-gray-400 py-2 px-5 block whitespace-no-wrap"
                                                        >
                                                        Imágenes
                                                        </button>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </td>
                                              </tr>
                                            )) : (
                                            <tr>
                                              <td colSpan="7" className="text-center p-2">
                                                <h2 className="font-bold">No se encontraron resultados. 😢</h2>
                                              </td>
                                            </tr>
                                            )
                                          )
                                        }
                                        {
                                          search.length === 0 && filteredEvents().length === 0 && (
                                            !loading ? (
                                            <tr>
                                              <td colSpan="7" className="text-center p-2">
                                                <h2 className="font-bold">Aún no hiciste una busqueda. 🤔</h2>
                                              </td>
                                            </tr>
                                            ) : (
                                            <tr>
                                              <td colSpan="7" className="text-center p-10">
                                                <h2 className="font-bold">Cargando... 🤗</h2>
                                              </td>
                                            </tr>
                                            )
                                          )
                                        }
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
            </div>
          </section>
        </div>
      </div>
    </div>
    <ToastContainer />
  </>
  )
}

export default HistoryPage;