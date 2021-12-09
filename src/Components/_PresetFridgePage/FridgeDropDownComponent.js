// component utilisé dans la page des fridges

import fold from "Images/fold.svg";
import imgcategorie from "Images/imgcategorie.svg";
import unfold from "Images/unfold.svg";
import React, { Component, useState, useContext, createContext } from "react";
import "CSS/FridgeDropDownCoponent.scss";
import FridgeProduitsCard from "./FridgeProductsCard";
import FridgeMenusCard from "./FridgeMenusCard";

import FridgeInfoContext from "Context/FridgeInfoContext";

export default function FridgeDropDownComponent({ fridge, children }) {
  const [open, setOpen] = useState(true);
  // const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function chooseColor() {
    return fridge.status.inProduction
      ? "blue"
      : fridge.status.horsService
      ? "red"
      : fridge.status.livraison
      ? "yellow"
      : "";
  }

  const [bgColor, setBgColor] = useState(chooseColor());

  return (
    <>
      <FridgeInfoContext.Provider value={fridge}>
        <div className="list-element">
          {open === true ? (
            <div>
              <div
                className={`${bgColor} list-element-title-fold`}
                onClick={() => handleClick()}
              >
                <div>{fridge.name}</div>
                <div>{fridge.status.message}</div>
                <div className="el-fold">
                  <img width="100%" src={fold} alt="" />
                </div>
              </div>
              <div className="list-element-sub">
                <div className="list-element-sub-description">
                  <div className="container h-100">
                    <div className="row ">
                      {children}
                      {/* <FridgeProduitsCard name="Produits" />
                      <FridgeMenusCard name="Menus" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`${bgColor} list-element-title-unfold`}
              onClick={() => handleClick()}
            >
              <div className="title-name">{fridge.name}</div>
              <div>{fridge.status.message}</div>
              <div className="el-fold">
                <img width="100%" src={unfold} alt="" />
              </div>
            </div>
          )}
        </div>
      </FridgeInfoContext.Provider>
    </>
  );
}
