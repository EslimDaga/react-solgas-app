import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import CheckpointTable from "../../components/checkpoint/CheckpointTable";

const Checkpoint = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Checkpoint" />
      <CheckpointTable />
    </>
  )
}

export default Checkpoint;
