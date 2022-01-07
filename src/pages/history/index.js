import { Fragment, useEffect, useState } from "react";
import { getUnits, getSearchEvents } from "../../service/history";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import ReactDatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import moment from "moment";
import { ChevronDownIcon, SearchCircleIcon } from "@heroicons/react/outline";
import "react-datepicker/dist/react-datepicker.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../assets/styles/css/history/style.css";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { getEventById } from "../../service/event";
import { api } from "../../constants/global";
import { Menu, Transition } from "@headlessui/react";

const HistoryPage = () => {
  const { handleSubmit, formState : {errors}, control } = useForm();
  const [allUnits, setAllUnits] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchEvents, setSearchEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalImages, setShowModalImages] = useState(false);

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

  const openModal = (id,state) => {
    getEventById(id).then(event => {
      setEvent(event);
      setShowModal(state);
    }).catch(e => {
      console.log(e);
    })
  }

  const openModalImages = (id,state) => {
    getEventById(id).then(event => {
      setEvent(event);
      setShowModalImages(state);
    }).catch(e => {
      console.log(e);
    })
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
      <Header />
      <Breadcrumb title="Historial" />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-1xl font-semibold self-center">
                    Detalles del Evento
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-gray-900 h-6 w-6 text-xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-5 flex-auto">
                  <div className="w-full bg-gray-100 flex">
                    <div className="bg-white rounded-lg shadow-sm">
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="flex flex-col sm:mt-0 gap-7 text-sm">
                          <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                            <div className="flex justify-start items-center gap-2">
                              <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                              <div>
                                <p className="text-white font-bold tracking-wider">
                                  Operador Logistico
                                </p>
                                <p className="text-white font-bold">
                                  {event.logistic_operator}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:mt-0 gap-7 text-sm">
                          <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                            <div className="flex justify-start items-center gap-2">
                              <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                              <div>
                                <p className="text-white font-bold tracking-wider">
                                  Placa
                                </p>
                                <p className="text-white font-bold">
                                  {event.unitid}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:mt-0 gap-7 text-sm">
                          <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                            <div className="flex justify-start items-center gap-2">
                              <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                              <div>
                                <p className="text-white font-bold tracking-wider">
                                  Tipo de Servicio
                                </p>
                                <p className="text-white font-bold">
                                  {event.type_of_service}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:mt-0 gap-7 text-sm">
                          <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                            <div className="flex justify-start items-center gap-2">
                              <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                              <div>
                                <p className="text-white font-bold tracking-wider">
                                  Fecha de Creación
                                </p>
                                <p className="text-white font-bold">
                                  {event.datetime}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:mt-0 gap-7 text-sm">
                          <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                            <div className="flex justify-start items-center gap-2">
                              <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                              <div>
                                <p className="text-white font-bold tracking-wider">
                                  Puntaje
                                </p>
                                <p className="text-white font-bold">
                                  {event.game_score}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:mt-0 gap-7 text-sm">
                          <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                            <div className="flex justify-start items-center gap-2">
                              <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                              <div>
                                <p className="text-white font-bold tracking-wider">
                                  Estado de Ruta
                                </p>
                                <p className="text-white font-bold">
                                  {event.route_status}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:mt-0 gap-7 text-sm">
                          <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                            <div className="flex justify-start items-center gap-2">
                              <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                              <div>
                                <p className="text-white font-bold tracking-wider">
                                  Conductor
                                </p>
                                <p className="text-white font-bold">
                                  {event.driver_fullname}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:mt-0 gap-7 text-sm">
                          <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                            <div className="flex justify-start items-center gap-2">
                              <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                              <div>
                                <p className="text-white font-bold tracking-wider">
                                  Checkpoint
                                </p>
                                <p className="text-white font-bold">
                                  {event.checkpoint}
                                </p>
                              </div>
                            </div>
                          </div>
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
      ) : null}
      {showModalImages ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-1xl font-semibold self-center">
                    Imagenes del Evento
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalImages(false)}
                  >
                    <span className="bg-transparent text-gray-900 h-6 w-6 text-xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-5 flex-auto">
                  <div className="w-full bg-gray-100 flex">
                    <div className="bg-white rounded-lg shadow-sm">
                      <Carousel
                        autoPlay
                        width={500}
                        dynamicHeight={20}
                        thumbWidth={35}
                      >
                        <div>
                          <img
                            src={api + JSON.parse(event.images).url1}
                            alt={api + JSON.parse(event.images).url1}
                          />
                          <p className="legend">Selfie del Conductor</p>
                        </div>
                        <div>
                          <img
                            src={api + JSON.parse(event.images).url2}
                            alt={api + JSON.parse(event.images).url2}
                          />
                          <p className="legend">Extintor</p>
                        </div>
                        <div>
                          <img
                            src={api + JSON.parse(event.images).url3}
                            alt={api + JSON.parse(event.images).url3}
                          />
                          <p className="legend">Delantero Izquierdo</p>
                        </div>
                        <div>
                          <img
                            src={api + JSON.parse(event.images).url4}
                            alt={api + JSON.parse(event.images).url4}
                          />
                          <p className="legend">Delantero Derecho</p>
                        </div>
                        <div>
                          <img
                            src={api + JSON.parse(event.images).url5}
                            alt={api + JSON.parse(event.images).url5}
                          />
                          <p className="legend">Posterior Izquiera</p>
                        </div>
                        <div>
                          <img
                            src={api + JSON.parse(event.images).url6}
                            alt={api + JSON.parse(event.images).url6}
                          />
                          <p className="legend">Posterior Derecha</p>
                        </div>
                        <div>
                          <img
                            src={api + JSON.parse(event.images).url7}
                            alt={api + JSON.parse(event.images).url7}
                          />
                          <p className="legend">Toma frontal de la unidad</p>
                        </div>
                        <div>
                          <img
                            src={api + JSON.parse(event.images).url8}
                            alt={api + JSON.parse(event.images).url8}
                          />
                          <p className="legend">Toma posterior de la unidad</p>
                        </div>
                        <div>
                          <img
                            src={api + JSON.parse(event.images).url9}
                            alt={api + JSON.parse(event.images).url9}
                          />
                          <p className="legend">Luces delanteras</p>
                        </div>
                        <div>
                          <img
                            src={api + JSON.parse(event.images).url10}
                            alt={api + JSON.parse(event.images).url10}
                          />
                          <p className="legend">Luces posteriores</p>
                        </div>
                        <div>
                          <img
                            src={api + JSON.parse(event.images).url11}
                            alt={api + JSON.parse(event.images).url11}
                          />
                          <p className="legend">Valvula interna</p>
                        </div>
                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="bg-white">
        <div className="pt-1">
          <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
            <section className="antialiased text-gray-600 w-full">
              <div className="flex flex-col justify-center">
                <div className="items-center pb-3 sm:relative lg:flex justify-between">
                  <form
                    onSubmit={handleSubmit(onSubmitForm)}
                    className="mx-1 lg:flex"
                  >
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
                          render={({ field }) => (
                            <ReactDatePicker
                              className="bg-gray-200 h-14 w-full pl-4 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                              selected={field.value}
                              //onChange={(date) => setStartDate(date)}
                              onChange={(date) => field.onChange(date)}
                              placeholderText="Seleccionar Fecha"
                            />
                          )}
                        />
                        {errors.initial_date && (
                          <span className="text-red-500 text-sm font-bold flex mt-1">
                            Este campo es requerido
                          </span>
                        )}
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
                          render={({ field }) => (
                            <ReactDatePicker
                              className="bg-gray-200 h-14 w-full pl-4 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                              selected={field.value}
                              onChange={(date) => field.onChange(date)}
                              placeholderText="Seleccionar Fecha"
                            />
                          )}
                        />
                        {errors.final_date && (
                          <span className="text-red-500 text-sm font-bold flex mt-1">
                            Este campo es requerido
                          </span>
                        )}
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
                            message: "Este campo es requerido",
                          }}
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              isClearable
                              placeholder="Buscar Unidad"
                              className="bg-gray-200 w-full rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                              options={allUnits}
                            />
                          )}
                        />
                        {errors.unit_name && (
                          <span className="text-red-500 text-sm font-bold flex mt-1">
                            Este campo es requerido
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={
                        `text-center self-center lg:ml-2 sm:mt-4 lg:mt-8` +
                        (errors.initial_date ||
                        errors.final_date ||
                        errors.unit_name
                          ? " self-center lg:mt-2"
                          : "")
                      }
                    >
                      <button
                        className={
                          `bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full` +
                          (errors.initial_date ||
                          errors.final_date ||
                          errors.unit_name
                            ? " opacity-50 cursor-not-allowed"
                            : "")
                        }
                        type="submit"
                        style={{ transition: "all .15s ease" }}
                      >
                        <div className="inline-flex items-center">Enviar</div>
                      </button>
                    </div>
                  </form>
                  <div className="flex flex-col">
                    <label className="block text-gray-700 text-base font-bold mb-2 ml-2">
                      Buscar por Conductor
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-3">
                        <SearchCircleIcon className="h-6 w-6" />
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
                                          {filteredEvents().map((event) => (
                                            <tr key={event.id}>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                                {event.provider}
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                                {event.logistic_operator}
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                                {event.unitid}
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                                {event.type_of_service}
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                                {event.checkpoint}
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                                {event.driver_fullname}
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                                {event.datetime}
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                                <Menu
                                                  as="div"
                                                  className="relative inline-block text-left"
                                                >
                                                  <div>
                                                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-900">
                                                      Acción
                                                      <ChevronDownIcon
                                                        className="-mr-1 ml-2 h-5 w-5"
                                                        aria-hidden="true"
                                                      />
                                                    </Menu.Button>
                                                  </div>
                                                  <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                  >
                                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                                      <div className="py-1">
                                                        <Menu.Item>
                                                          <button
                                                            className="bg-gray-100 text-gray-900 w-full block px-4 py-2 text-sm"
                                                            onClick={() =>
                                                              openModal(
                                                                event.id,
                                                                true
                                                              )
                                                            }
                                                          >
                                                            Detalles
                                                          </button>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                          <button
                                                            className="bg-gray-100 text-gray-900 w-full block px-4 py-2 text-sm"
                                                            onClick={() =>
                                                              openModalImages(
                                                                event.id,
                                                                true
                                                              )
                                                            }
                                                          >
                                                            Imágenes
                                                          </button>
                                                        </Menu.Item>
                                                      </div>
                                                    </Menu.Items>
                                                  </Transition>
                                                </Menu>
                                              </td>
                                            </tr>
                                          ))}
                                          {search.length > 0 ? (
                                            <tr>
                                              <td
                                                colSpan="7"
                                                className="text-center p-2"
                                              >
                                                <h2 className="font-bold">
                                                  No se encontraron resultados.
                                                  😢
                                                </h2>
                                              </td>
                                            </tr>
                                          ) : null}
                                          {search.length === 0 &&
                                            filteredEvents().length === 0 &&
                                            (!loading ? (
                                              <tr>
                                                <td
                                                  colSpan="7"
                                                  className="text-center p-2"
                                                >
                                                  <h2 className="font-bold">
                                                    Aún no hiciste una busqueda.
                                                    🤔
                                                  </h2>
                                                </td>
                                              </tr>
                                            ) : (
                                              <tr>
                                                <td
                                                  colSpan="7"
                                                  className="text-center p-10"
                                                >
                                                  <h2 className="font-bold">
                                                    Cargando... 🤗
                                                  </h2>
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
              </div>
            </section>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default HistoryPage;