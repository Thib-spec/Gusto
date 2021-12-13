// component utilisé dans la page des fridges

import fold from "Images/fold.svg";
import imgcategorie from "Images/imgcategorie.svg";
import unfold from "Images/unfold.svg";
import React, { Component, useState, useContext, createContext } from "react";
import "CSS/FridgeDropDownCoponent.scss";

import DropDownComponentContext from "Context/DropDownComponentContext";

export default function DropDownComponent({ preset, children }) {
  const [open, setOpen] = useState(true);
  // const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function chooseColor() {
    return "blue";
  }

  const [bgColor, setBgColor] = useState(chooseColor());

  return (
    <>
      <DropDownComponentContext.Provider value={preset}>
        <div className="list-element">
          {open === true ? (
            <div>
              <div
                className={`${bgColor} list-element-title-fold`}
                onClick={() => handleClick()}
              >
                <div>{preset.name}</div>
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
              <div className="title-name">{preset.name}</div>
              <div className="el-fold">
                <img width="100%" src={unfold} alt="" />
              </div>
            </div>
          )}
        </div>
      </DropDownComponentContext.Provider>
    </>
  );
}
