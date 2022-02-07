import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import CheckpointTable from "../../components/checkpoint/CheckpointTable";
import { Helmet } from "react-helmet";
import Favicon from "../../assets/images/ico-solgas.png";

const Checkpoint = () => {
  return (
    <section className="h-screen dark:bg-gray-800">
      <Helmet>
        <title>Solgas - Checkpoint</title>
        <link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
      </Helmet>
      <Header />
      <Breadcrumb title="Checkpoint" url="/checkpoint" />
      <CheckpointTable />
    </section>
  );
}

export default Checkpoint;
