import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import UnitTable from "../../components/units/UnitTable";
import Favicon from "../../assets/images/ico-solgas.png";
import { Helmet } from "react-helmet";

const UnitPage = () => {
  return (
    <section className="h-screen bg-white dark:bg-gray-800">
      <Helmet>
        <title>Solgas - Unidades</title>
        <link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
      </Helmet>
      <Header />
      <Breadcrumb title="Unidades" url="/units" />
      <UnitTable />
    </section>
  );
}

export default UnitPage;