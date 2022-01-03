import { useEffect, useState } from "react";
import { getEvents, getEventById } from "../../service/event";
import { api } from "../../constants/global";
import { SearchCircleIcon, BadgeCheckIcon } from "@heroicons/react/solid";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../assets/styles/css/events/style.css";

const EventTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalImages, setShowModalImages] = useState(false);

  useEffect(() => {
    getEvents().then(events => {
      setIsLoading(false);
      setEvents(events);
    })
  },[]);

  const filteredEvents = () => {
    if(search.length === 0){
      return events.slice(currentPage, currentPage + 10);
    }
    const filtered = events.filter(eve => eve.unitid.toLowerCase().includes(search));
    return filtered.slice(currentPage, currentPage + 10);
  }


  const nextPage = () => {
    if(events.filter(eve => eve.unitid.toLowerCase().includes(search)).length > currentPage + 10){
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

  return (
  <>
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
                    <div className="flex flex-col mt-5 gap-7 text-sm">
                      <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                        <div className="flex justify-start items-center gap-2">
                          <BadgeCheckIcon className="h-8 w-8 text-yellow-500"/>
                          <div>
                            <p className="text-white font-bold tracking-wider">Operador Logistico</p>
                            <p className="text-white font-bold">{event.logistic_operator}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-5 gap-7 text-sm">
                      <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                        <div className="flex justify-start items-center gap-2">
                          <BadgeCheckIcon className="h-8 w-8 text-yellow-500"/>
                          <div>
                            <p className="text-white font-bold tracking-wider">Placa</p>
                            <p className="text-white font-bold">{event.unitid}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-5 gap-7 text-sm">
                      <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                        <div className="flex justify-start items-center gap-2">
                          <BadgeCheckIcon className="h-8 w-8 text-yellow-500"/>
                          <div>
                            <p className="text-white font-bold tracking-wider">Tipo de Servicio</p>
                            <p className="text-white font-bold">{event.type_of_service}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-5 gap-7 text-sm">
                      <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                        <div className="flex justify-start items-center gap-2">
                          <BadgeCheckIcon className="h-8 w-8 text-yellow-500"/>
                          <div>
                            <p className="text-white font-bold tracking-wider">Checkpoint</p>
                            <p className="text-white font-bold">{event.checkpoint}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-5 gap-7 text-sm">
                      <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                        <div className="flex justify-start items-center gap-2">
                          <BadgeCheckIcon className="h-8 w-8 text-yellow-500"/>
                          <div>
                            <p className="text-white font-bold tracking-wider">Conductor</p>
                            <p className="text-white font-bold">{event.driver_fullname}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-5 gap-7 text-sm">
                      <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                        <div className="flex justify-start items-center gap-2">
                          <BadgeCheckIcon className="h-8 w-8 text-yellow-500"/>
                          <div>
                            <p className="text-white font-bold tracking-wider">Fecha de Creación</p>
                            <p className="text-white font-bold">{event.datetime}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-5 gap-7 text-sm">
                      <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                        <div className="flex justify-start items-center gap-2">
                          <BadgeCheckIcon className="h-8 w-8 text-yellow-500"/>
                          <div>
                            <p className="text-white font-bold tracking-wider">Puntaje</p>
                            <p className="text-white font-bold">{event.game_score}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-5 gap-7 text-sm">
                      <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                        <div className="flex justify-start items-center gap-2">
                          <BadgeCheckIcon className="h-8 w-8 text-yellow-500"/>
                          <div>
                            <p className="text-white font-bold tracking-wider">Estado de Ruta</p>
                            <p className="text-white font-bold">{event.route_status}</p>
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
                    <Carousel autoPlay width={500} dynamicHeight={20} thumbWidth={35}>
                      <div>
                        <img src={api + JSON.parse(event.images).url1} alt={api + JSON.parse(event.images).url1}/>
                        <p className="legend">Selfie del Conductor</p>
                      </div>
                      <div>
                        <img src={api + JSON.parse(event.images).url2} alt={api + JSON.parse(event.images).url2}/>
                        <p className="legend">Extintor</p>
                      </div>
                      <div>
                        <img src={api + JSON.parse(event.images).url3} alt={api + JSON.parse(event.images).url3}/>
                        <p className="legend">Delantero Izquierdo</p>
                      </div>
                      <div>
                        <img src={api + JSON.parse(event.images).url4} alt={api + JSON.parse(event.images).url4}/>
                        <p className="legend">Delantero Derecho</p>
                      </div>
                      <div>
                        <img src={api + JSON.parse(event.images).url5} alt={api + JSON.parse(event.images).url5}/>
                        <p className="legend">Posterior Izquiera</p>
                      </div>
                      <div>
                        <img src={api + JSON.parse(event.images).url6} alt={api + JSON.parse(event.images).url6}/>
                        <p className="legend">Posterior Derecha</p>
                      </div>
                      <div>
                        <img src={api + JSON.parse(event.images).url7} alt={api + JSON.parse(event.images).url7}/>
                        <p className="legend">Toma frontal de la unidad</p>
                      </div>
                      <div>
                        <img src={api + JSON.parse(event.images).url8} alt={api + JSON.parse(event.images).url8}/>
                        <p className="legend">Toma posterior de la unidad</p>
                      </div>
                      <div>
                        <img src={api + JSON.parse(event.images).url9} alt={api + JSON.parse(event.images).url9}/>
                        <p className="legend">Luces delanteras</p>
                      </div>
                      <div>
                        <img src={api + JSON.parse(event.images).url10} alt={api + JSON.parse(event.images).url10}/>
                        <p className="legend">Luces posteriores</p>
                      </div>
                      <div>
                        <img src={api + JSON.parse(event.images).url11} alt={api + JSON.parse(event.images).url11}/>
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
              <div className="items-center pb-3 sm:relative lg:flex">
                <div className="relative">
                  <div className="absolute top-4 left-3">
                    <SearchCircleIcon className="h-6 w-6"/>
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
                                            onClick={() => openModal(event.id,true)}
                                          >
                                          Detalles
                                          </button>
                                        </li>
                                        <li className="">
                                          <button
                                            className="font-bold bg-gray-200 hover:bg-gray-400 py-2 px-5 block whitespace-no-wrap"
                                            onClick={() => openModalImages(event.id,true)}
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
                            </tbody>
                          </table>
                          {isLoading &&
                            <div className="flex justify-center">
                              <div className="w-full h-48 bg-gray-100 flex justify-center items-center">
                                <div className="w-3/5 bg-green-100 rounded-lg shadow-sm p-5 border-dashed border border-green-500 flex flex-col  justify-between items-center gap-2 sm:gap-0">
                                  <div className="flex flex-col sm:flex-row justify-start items-center">
                                    <div className="flex rounded-md">
                                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                      </svg>
                                    </div>
                                    <div className="text-center sm:text-left">
                                      <h1 className="text-gray-900 font-bold tracking-wider">Cargando...</h1>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
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
  )
}

export default EventTable;