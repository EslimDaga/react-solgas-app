import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import CheckpointTable from "../../components/checkpoint/CheckpointTable";

const Checkpoint = () => {
  return (
    <section className="h-screen dark:bg-gray-800">
      <Header />
      <Breadcrumb title="Checkpoint" url="/checkpoint" />
      <CheckpointTable />
    </section>
  );
}

export default Checkpoint;
