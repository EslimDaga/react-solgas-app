import Breadcrumb from "../../components/common/Breadcrumb";
import Header from "../../components/Header";
import EventTable from "../../components/events/EventTable";

const EventPage = () => {


  return (
    <>
      <Header/>
      <Breadcrumb title="Eventos" url="/events"/>
      <EventTable/>
    </>
  )
}

export default EventPage;