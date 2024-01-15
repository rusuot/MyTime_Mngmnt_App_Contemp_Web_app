import HomeMyTODOs from "components/MyTODOs/HomeMyTODOs";
import HomeHistory from "components/History/HomeHistory";
import Container from "../../components/Containers_React/Container";
import Container11 from "../../components/Containers_React/Container11";
import ColumnA1 from "../../components/Containers_React/ColumnA1";
import Container00 from "../../components/Containers_React/Container00";

const Home = () => {
  return (
    <div className="home">
      <Container00 />
      <Container />
      <ColumnA1 />
      <HomeHistory />
      <HomeMyTODOs />
      <Container11 />

    </div>
  );
};

export default Home;