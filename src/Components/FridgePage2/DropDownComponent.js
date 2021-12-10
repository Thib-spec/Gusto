// component utilisé dans la page des fridges

import fold from "Images/fold.svg";
import imgcategorie from "Images/imgcategorie.svg";
import unfold from "Images/unfold.svg";
import React, { Component, useState, useContext, createContext } from "react";
import "CSS/FridgeDropDownCoponent.scss";

import Value from "helpers/Value";

import InfoContext from "Context/FridgeInfoContext";
import { useTranslation } from "react-i18next";

export default function DropDownComponent({ fridge, children }) {
  const [open, setOpen] = useState(true);
  const { t, i18n } = useTranslation();
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
  const presetChosen = new Value(useState({ id: -1, name: "Choose a Preset" }));

  return (
    <>
      <InfoContext.Provider value={{ fridge, presetChosen }}>
        <div className="list-element">
          {open === true ? (
            <div>
              <div
                className={`${bgColor} list-element-title-fold`}
                onClick={() => handleClick()}
              >
                <div>{fridge.name}</div>
                <div>{t(`${fridge.status.label_trad}`)}</div>
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
              <div className="el-fold">
                <img width="100%" src={unfold} alt="" />
              </div>
            </div>
          )}
        </div>
      </InfoContext.Provider>
    </>
  );
}
