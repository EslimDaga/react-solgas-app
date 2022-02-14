import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import UnitTable from "../../components/units/UnitTable";

const UnitPage = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Unidades" url="/units" />
      <UnitTable />
    </>
  )
}

export default UnitPage;