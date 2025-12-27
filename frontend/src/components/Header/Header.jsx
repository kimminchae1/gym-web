import "./Header.css";
import TextButton from "../Button/TextButton";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Header = () => {
  const nav = useNavigate();

  return (
    <header className="Header">
      <NavLink to="/" className="header_logo">
        <img src={logo} alt="logo" />
      </NavLink>
      <NavLink to="/" className="header_title">
        짐 케어 헬스 & PT
      </NavLink>

      <nav className="header_menu">
        <NavLink to="/machine">운동기구 소개</NavLink>
        <NavLink to="/reservation">개인 PT 신청</NavLink>
        <NavLink to="/post/board">게시판</NavLink>
        <NavLink to="/location">위치</NavLink>
      </nav>

      <div className="header_button">
        <TextButton onClick={() => nav("/login")} text={"로그인"} />
        <TextButton onClick={() => nav("/join")} text={"회원가입"} />
      </div>
    </header>
  );
};

export default Header;
