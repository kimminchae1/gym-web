// src/pages/home/Home.jsx
import PageLayout from "../../components/layout/PageLayout";
import HomeVideo from "./components/HomeVideo";
import HomeIntro from "./components/HomeIntro";
import HomeProgram from "./components/HomeProgram";
import HomeFacility from "./components/HomeFacility";
import "./Home.css";

const Home = () => {
  return (
    <PageLayout>
        <div className="home-container">
          <HomeVideo />
          <HomeFacility /> 
          <HomeProgram />
        </div>
    </PageLayout>
  );
};

export default Home;
