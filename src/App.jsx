import "./App.css";
import {Outlet, Route, Routes} from "react-router-dom";
import MovieDetail from "./components/movies/MovieDetail";
import Nav from "./components/common/Nav";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<MovieDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
