import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import UnitTable from "../../components/units/UnitTable";
import { Provider } from "react-redux";
import store from "../../store/store";

const UnitPage = () => {
  return (
    <Provider store={store}>
      <section className="h-screen bg-white dark:bg-gray-800">
        <Header />
        <Breadcrumb title="Unidades" url="/units" />
        <UnitTable />
      </section>
    </Provider>
  );
}

export default UnitPage;