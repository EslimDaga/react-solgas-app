import Breadcrumb from "../../components/common/Breadcrumb";
import Header from "../../components/Header";
import { Helmet } from "react-helmet";
import Favicon from "../../assets/images/ico-solgas.png";
import DriverTable from "../../components/drivers/DriverTable";
import { Provider } from "react-redux";
import store from "../../store/store";

const DriverPage = () => {
  return (
    <Provider store={store}>
      <section className="h-screen bg-white dark:bg-gray-800">
        <Helmet>
          <title>Solgas - Conductores</title>
          <link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
        </Helmet>
        <Header />
        <Breadcrumb title="Conductores" url="/drivers" />
        <DriverTable />
      </section>
    </Provider>
  );
};

export default DriverPage;
