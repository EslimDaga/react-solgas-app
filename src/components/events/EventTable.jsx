import { useEffect, useState } from "react";
import { getEvents, getEventById } from "../../service/event";
import ModalDetails from "../common/ModalDetails";
import ModalImages from "../common/ModalImages";
import Pagination from "../common/Pagination";
import LoadingDataInTable from "../common/LoadingDataInTable";
import InputSearch from "../common/InputSearch";
import Table from "./Table";
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
        <ModalImages event={event} closeModalImages={closeModalImages} />
      ) : null}
      <div className="bg-white">
        <div className="pt-1">
          <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
            <section className="antialiased text-gray-600 w-full">
              <div className="flex flex-col justify-center">
                <InputSearch search={search} onSearchChange={onSearchChange} label="Buscar por Unidad"/>
                <div className="w-full mx-auto bg-white rounded-lg">
                  <div className="lg:pr-3 sm:pr-1 lg:pl-3 sm:pl-1 pb-3">
                    <div className="flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-0 lg:px-5">
                          <div className="sm:rounded-lg">
                            <Table
                              filteredEvents={filteredEvents}
                              openModal={openModal}
                              openModalImages={openModalImages}
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
              <Pagination prevPage={prevPage} nextPage={nextPage} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventTable;