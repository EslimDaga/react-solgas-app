import { Fragment, useEffect, useState } from "react";
import { getEvents, getEventById } from "../../service/event";
import { ChevronDownIcon } from "@heroicons/react/solid";
import ModalDetails from "../common/ModalDetails";
import ModalImages from "../common/ModalImages";
import { Menu, Transition } from "@headlessui/react";
import Pagination from "../common/Pagination";
import NoResultsFound from "../common/NoResultsFound";
import LoadingDataInTable from "../common/LoadingDataInTable";
import InputSearch from "../common/InputSearch";
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

  const closeModal = () => {
    setShowModal(false);
  }

  const openModalImages = (id,state) => {
    getEventById(id).then(event => {
      setEvent(event);
      setShowModalImages(state);
    }).catch(e => {
      console.log(e);
    })
  }

  const closeModalImages = () => {
    setShowModalImages(false);
  }

  return (
    <>
      {showModal ? (
        <ModalDetails event={event} closeModal={closeModal} />
      ) : null}
      {showModalImages ? (
        <ModalImages event={event} closeModal={closeModalImages} />
      ) : null}
      <div className="bg-white">
        <div className="pt-1">
          <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
            <section className="antialiased text-gray-600 w-full">
              <div className="flex flex-col justify-center">
                <InputSearch search={search} onSearchChange={onSearchChange} />
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
                                          <Menu.Items className="origin-top-right absolute right-0 mt-0 w-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                            <div className="py-0">
                                              <Menu.Item>
                                                <button
                                                  className="bg-gray-100 text-gray-900 w-full block px-4 py-2 text-sm"
                                                  onClick={() =>
                                                    openModal(event.id, true)
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
                                {search.length > 0 &&
                                filteredEvents().length === 0 ? (
                                  <NoResultsFound />
                                ) : null}
                              </tbody>
                            </table>
                            {isLoading && <LoadingDataInTable />}
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

export default EventTable;