import Breadcrumb from "../../components/common/Breadcrumb";
import Header from "../../components/Header";
import EventTable from "../../components/events/EventTable";

const EventPage = () => {


  return (
    <section className="h-screen dark:bg-gray-800">
      <Header/>
      <Breadcrumb title="Eventos" url="/events"/>
      <EventTable/>
    </section>
  )
}

export default EventPage;