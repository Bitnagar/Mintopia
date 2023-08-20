import React, { useEffect, useRef } from "react";
import Moon from "../assets/svg/moon.svg";
import Sun from "../assets/svg/sun.svg";

export default function Header() {
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const sunIcon = sunRef.current;
    const moonIcon = moonRef.current;
    const menuIcon = menuRef.current;
    if (!sunIcon) return;
    if (!moonIcon) return;
    if (!menuIcon) return;

    function handleSunClick() {
      sunIcon.classList.add("scaleDown");
      moonIcon.classList.remove("scaleDown");
      document.body.classList.remove("darkMode");
      document.getElementById("menuIcon").style.fill = "black";
      document.querySelector(".card-image").style.borderColor = "black";
    }

    function handleMoonClick() {
      moonIcon.classList.add("scaleDown");
      sunIcon.classList.remove("scaleDown");
      document.body.classList.add("darkMode");
      document.getElementById("menuIcon").style.fill = "white";
      document.querySelector(".card-image").style.borderColor = "white";
    }

    function handleMenuClick() {
      const overlay = document.querySelector(".overlay");
      overlay.style.visibility = "visible";
    }

    sunIcon.addEventListener("click", handleSunClick);
    moonIcon.addEventListener("click", handleMoonClick);
    menuIcon.addEventListener("click", handleMenuClick);

    return () => {
      sunIcon.removeEventListener("click", handleSunClick);
      moonIcon.removeEventListener("click", handleMoonClick);
      menuIcon.removeEventListener("click", handleMenuClick);
    };
  });

  return (
    <header>
      <div className="progress"></div>
      <nav>
        <svg
          ref={menuRef}
          width="27"
          height="18"
          viewBox="0 0 27 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: "pointer" }}
        >
          <path
            id="menuIcon"
            d="M0 18H27V15H0V18ZM0 10.5H27V7.5H0V10.5ZM0 0V3H27V0H0Z"
            fill="black"
          />
        </svg>
        <h1 className="heading">Minertia</h1>
        <div className="toggle-btns">
          <img
            ref={sunRef}
            id="sun"
            src={Sun}
            alt="sun.svg"
            width={24}
            height={24}
            className="scaleDown"
          />
          <img
            ref={moonRef}
            id="moon"
            src={Moon}
            alt="moon.svg"
            width={24}
            height={24}
          />
        </div>
      </nav>
      <div className="error">
        <p id="error-text">
          Something went wrong. <br></br>Please try again.
        </p>
      </div>
    </header>
  );
}
