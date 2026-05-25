import { NavLink, Routes, Route } from "react-router-dom";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";

export default function App() {
  return (
    <>
<nav>
  <div className="left-links">
    <NavLink to="/" end>
      <span className="material-symbols-outlined">queue_music</span>
      StreamList
    </NavLink>
    <NavLink to="/movies">
      <span className="material-symbols-outlined">movie</span>
      Movies
    </NavLink>
  </div>
  <div className="right-links">
    <NavLink to="/cart">
      <span className="material-symbols-outlined">shopping_cart</span>
      Cart
    </NavLink>

    <NavLink to="/about">
      <span className="material-symbols-outlined">info</span>
      About
    </NavLink>
  </div>
</nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}
