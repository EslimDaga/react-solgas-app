import Breadcrumb from "../../components/common/Breadcrumb";
import Header from "../../components/Header";

const EventPage = () => {
  return (
    <>
      <Header/>
      <Breadcrumb title="Eventos"/>
      <div className="bg-white">
        <div className="pt-1">
          <div className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
            Content
          </div>
        </div>
      </div>
    </>
  )
}

export default EventPage;