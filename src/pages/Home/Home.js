import HomeMyTODOs from "components/MyTODOs/HomeMyTODOs";
import HomeHistory from "components/History/HomeHistory";
import Container from "../../components/Containers_React/Container";
import ContainerMyName from "../../components/Containers_React/ContainerMyName";
import DeteleAllDataContainer from "../../components/Containers_React/DeteleAllDataContainer";
import OpenPieChartsContainer from "../../components/Containers_React/OpenPieChartsContainer";
import HelloUserContainer from "../../components/Containers_React/HelloUserContainer";
import RegisterOrBurnHoursContainer from "../../components/Containers_React/RegisterOrBurnHoursContainer";
import AddHoursContainer from "../../components/Containers_React/AddHoursContainer";
import AddBurnedHoursContainer from "../../components/Containers_React/AddBurnedHoursContainer";

const Home = () => {
  return (
    <div className="home">
      <HelloUserContainer />
      <Container />
      <RegisterOrBurnHoursContainer/>
      <AddHoursContainer/>
      <AddBurnedHoursContainer/>
      <OpenPieChartsContainer />
      <DeteleAllDataContainer />
      <HomeHistory />
      <HomeMyTODOs />
      <ContainerMyName />


    </div>
  );
};

export default Home;