import { Routes, Route } from "react-router-dom";

import Join from "./pages/auth/Join";
import Login from "./pages/auth/Login";
import Mypage from "./pages/auth/Mypage";
import Home from "./pages/home/Home";
import Location from "./pages/introduce/Location";
import Machine from "./pages/machine/Machine";
import PostBoard from "./pages/post/PostBoard";
import PostEdit from "./pages/post/PostEdit";
import PostList from "./pages/post/PostList";
import PostWrite from "./pages/post/PostWrite";
import AppointmentHome from "./pages/reservation/AppointmentHome";
import Dashboard from "./pages/reservation/Dashboard";
import Reservation from "./pages/reservation/Reservation";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/location" element={<Location />} />
        <Route path="/machine" element={<Machine />} />
        <Route path="/post/board" element={<PostBoard />} />
        <Route path="/post/edit" element={<PostEdit />} />
        <Route path="/post/list" element={<PostList />} />
        <Route path="/post/write" element={<PostWrite />} />
        <Route path="/appointment/home" element={<AppointmentHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
