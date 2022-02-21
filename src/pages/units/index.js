import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import UnitTable from "../../components/units/UnitTable";

const UnitPage = () => {
  return (
    <section className="h-screen bg-white dark:bg-gray-800">
      <Header />
      <Breadcrumb title="Unidades" url="/units" />
      <UnitTable />
    </section>
  );
}

export default UnitPage;