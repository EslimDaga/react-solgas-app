import Breadcrumb from "../../components/common/Breadcrumb";
import Header from "../../components/Header";
import EventTable from "../../components/events/EventTable";
import { Helmet } from "react-helmet";
import Favicon from "../../assets/images/ico-solgas.png";

const EventPage = () => {
  return (
    <section className="h-screen dark:bg-gray-800">
      <Helmet>
        <title>Solgas - Eventos</title>
        <link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
      </Helmet>
      <Header />
      <Breadcrumb title="Eventos" url="/events" />
      <EventTable />
    </section>
  );
}

export default EventPage;