// src/pages/reservation/Reservation.jsx
import PageLayout from "../../components/layout/PageLayout";
import TrainerList from "./components/TrainerList";
import TrainerProfiles from "./components/TrainerProfiles";
import AnimatedMarquee from "./components/AnimatedMarquee";
import "./Reservation.css";

const Reservation = () => {
  return (
    <PageLayout>
      <div className="reservation-container">
        {/* 네비게이션 바 */}
        <nav className="navbar2">
          <div className="container">
            <a className="navbar-brand" href="#">
              개인 1:1 PT 신청
            </a>
            <AnimatedMarquee />
            <div className="nav-buttons">
              <a href="/reservationDashboard" className="btn btn-dashboard">
                신청조회
              </a>
              <a href="/reservation" className="btn btn-appointment">
                신청
              </a>
            </div>
          </div>
        </nav>

        {/* 메인 콘텐츠 */}
        <div className="wrapper">
          <div className="container">
            <h1 className="main-title">개인 PT 신청</h1>
            <div className="content-row">
              <TrainerList />
              <TrainerProfiles />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Reservation;
