import "./Loader.css";
import React, { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    let Loader = document.getElementById("Loader");
    if (Loader) {
      setTimeout(() => {
        Loader.classList.remove("show");
      }, 2000);
    }
  }, []);

  return (
    <div className="Loader show" id="Loader">
      <div className="slice"></div>
    </div>
  );
}
