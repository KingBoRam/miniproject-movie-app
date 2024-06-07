import "./App.css";
import {Outlet, Route, Routes} from "react-router-dom";
import MovieDetail from "./components/movies/MovieDetail";
import Nav from "./components/common/Nav";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import SearchResults from "./components/pages/SearchResults";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<MovieDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search" element={<SearchResults />} />
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
