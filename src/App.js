import Home from "./pages/Home";
import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Layout from "./components/layout/Layout";

function App() {
  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    overlay.addEventListener("click", () => {
      overlay.style.visibility = "hidden";
    });
  });
  return (
    <>
      <BrowserRouter>
        <div className="overlay">
          <svg
            id="close-overlay"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M56 5.64L50.36 0L28 22.36L5.64 0L0 5.64L22.36 28L0 50.36L5.64 56L28 33.64L50.36 56L56 50.36L33.64 28L56 5.64Z"
              fill="black"
            />
          </svg>
          <ul className="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
