import "CSS/refrigerateursPage.css";
import "CSS/colors.css";
import React, { Component, useState } from "react";

export default function RefrigerateursPage() {
  const [click, setClicked] = useState(false);

  function handleClick() {
    if (click === true) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  }
  return (
    <>
      <div className="container-fluid vh-100 grey">
        <div className="container-fluid h-100 py-5 red">
          <div className="row h-100 justify-content-center d-flex blue">
            <div className="col-12 col-md-11 col-lg-10 col-xl-9 yellow">
              <div className="frigoCard">
                <div className="row justify-content-center d-flex blueviolet">
                  <div className="green col-8">Salut</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
