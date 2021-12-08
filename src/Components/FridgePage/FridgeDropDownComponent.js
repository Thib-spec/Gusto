// component utilisé dans la page des fridges

import fold from "Images/fold.svg";
import imgcategorie from "Images/imgcategorie.svg";
import unfold from "Images/unfold.svg";
import React, { Component, useState } from "react";
import "CSS/FridgeDropDownCoponent.scss";
import FridgeProduitsCard from "Components/FridgePage/FridgeProductsCard";
import FridgeMenusCard from "Components/FridgePage/FridgeMenusCard";
import FridgeGestionCard from "Components/FridgePage/FridgeGestionCard";
import FridgeLogsCard from "Components/FridgePage/FridgeLogsCard";

export default function FridgeDropDownComponent(props) {
  const [open, setOpen] = useState(true);
  // const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function chooseColor() {
    return props.fridge.status.inProduction
      ? "blue"
      : props.fridge.status.horsService
      ? "red"
      : props.fridge.status.livraison
      ? "yellow"
      : "";
  }

  const [bgColor, setBgColor] = useState(chooseColor());

  return (
    <>
      <div className="list-element">
        {open === true ? (
          <div>
            <div
              className={`${bgColor} list-element-title-fold`}
              onClick={() => handleClick()}
            >
              <div>{props.fridge.name}</div>
              <div>{props.fridge.status.message}</div>
              <div className="el-fold">
                <img width="100%" src={fold} alt="" />
              </div>
            </div>
            <div className="list-element-sub">
              <div className="list-element-sub-description">
                <div className="container h-100">
                  <div className="row ">
                    <FridgeProduitsCard name="Produits" {...props} />
                    <FridgeMenusCard name="Menus" {...props} />
                    <div class="w-100"></div>
                    <FridgeLogsCard name="Logs" idFridge={props.idFridge} />
                    <FridgeGestionCard name="Gestion VMC" />
                    <div class="w-100"></div>
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
            <div className="title-name">{props.fridge.name}</div>
            <div>{props.fridge.status.message}</div>
            <div className="el-fold">
              <img width="100%" src={unfold} alt="" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
