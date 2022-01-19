import { useEffect, useState } from "react";
import { getUnits, getSearchEvents } from "../../service/history";
import { getEventById } from "../../service/event";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import ModalDetails from "../../components/common/ModalDetails";
import ModalImages from "../../components/common/ModalImages";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../assets/styles/css/history/style.css";
import HistoryTable from "../../components/history/HistoryTable";

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

  const onSubmitForm = async(data) => {
    setSearchEvents([]);
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
        <ModalDetails event={event} closeModal={closeModal} />
      ) : null}
      {showModalImages ? (
        <ModalImages event={event} closeModalImages={closeModalImages} />
      ) : null}
      <HistoryTable
        handleSubmit={handleSubmit}
        onSubmitForm={onSubmitForm}
        control={control}
        errors={errors}
        allUnits={allUnits}
        search={search}
        onSearchChange={onSearchChange}
        filteredEvents={filteredEvents}
        openModal={openModal}
        openModalImages={openModalImages}
        loading={loading}
        prevPage={prevPage}
        nextPage={nextPage}
      />
      <ToastContainer />
    </>
  );
}

export default HistoryPage;