import Breadcrumb from "../../components/common/Breadcrumb";
import Header from "../../components/Header";
import { Helmet } from "react-helmet";
import Favicon from "../../assets/images/ico-solgas.png";

const DriverPage = () => {
  return (
    <>
      <Helmet>
        <title>Solgas - Conductores</title>
        <link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
      </Helmet>
      <Header />
      <Breadcrumb title="Conductores" url="/drivers" />
    </>
  );
};

export default DriverPage;
