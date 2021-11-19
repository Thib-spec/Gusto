import fold from "../Images/fold.svg";
import imgcategorie from "Images/imgcategorie.svg";
import unfold from "../Images/unfold.svg";
import React, { Component, useState } from "react";
import "CSS/FridgeDropDownCoponent.scss";
import FrigesProduitCard from "Components/FridgesProduitsCard";
import FridgesMenusCard from "Components/FridgesMenusCard";
import FridgesGestionCard from "Components/FridgesGestionCard";

export default function FridgeDropDownComponent({
  description,
  title,
  status,
}) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function choiseColor() {
    return status.inProduction
      ? "blue"
      : status.horsService
      ? "red"
      : status.livraison
      ? "yellow"
      : "";
  }

  const [bgColor, setBgColor] = useState(choiseColor());

  return (
    <>
      <div className="list-element">
        {open === true ? (
          <div>
            <div
              className={`${bgColor} list-element-title-fold`}
              onClick={() => handleClick()}
            >
              <div>{title}</div>
              <div>{status.message}</div>
              <div className="el-fold">
                <img width="100%" src={fold} alt="" />
              </div>
            </div>
            <div className="list-element-sub">
              <div className="list-element-sub-description">
                {/* {description} */}

                <div className="container h-100 yellow">
                  {/* <div className="row row-cols-xl-2 d-flex flex-columns justify-content-center"> */}
                  <div className="row row-cols-xl-2 justify-content-center red">
                    {/* <div className="col red m-1 col-lg-4 col-md-6 col-sm-12"> */}
                    <div className="col red m-1 col-lg-4 col-md-8 col-sm-12">
                      <FrigesProduitCard name="Produits" />
                    </div>
                    <div className="col blue m-1 col-lg-4 col-md-6 col-sm-12">
                      <FridgesMenusCard name="Menus" />
                    </div>
                    <div className="col blueviolet m-1 col-lg-4 col-md-6 col-sm-12">
                      <FridgesGestionCard name="Gestion VMC" />
                    </div>
                    <div className="col blue m-1 col-lg-4 col-md-6 col-sm-12">
                      <FridgesGestionCard name="Gestion VMC" />
                    </div>
                  </div>

                  {/* <FrigesProduitCard name="Produits"/>
                        <FridgesMenusCard name="Menus"/>
                        <FridgesGestionCard name="Gestion VMC" />
                        <FridgesGestionCard name="Gestion VMC" /> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`${bgColor} list-element-title-unfold`}
            onClick={() => handleClick()}
          >
            <div className="title-name">{title}</div>
            <div>{status.message}</div>
            <div className="el-fold">
              <img width="100%" src={unfold} alt="" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
