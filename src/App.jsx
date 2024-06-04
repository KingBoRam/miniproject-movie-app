import "./App.css";
import {Outlet, Route, Routes} from "react-router-dom";
import MovieDetail from "./components/movies/MovieDetail";
import Nav from "./components/Nav";
import SignIn from "./components/signs/SignIn";
import SignUp from "./components/signs/SignUp";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<MovieDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
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
