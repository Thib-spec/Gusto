// component utilisé dans la page des fridges

import fold from "Images/fold.svg";
import imgcategorie from "Images/imgcategorie.svg";
import unfold from "Images/unfold.svg";
import React, {
  Component,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";
import "CSS/FridgeDropDownCoponent.scss";

import Value from "helpers/Value";
import PageContext from "Context/PageContext";

import DropDownComponentContext from "Context/DropDownComponentContext";
import { useTranslation } from "react-i18next";
import useFridgePreset from "./useFridgePreset";

export default function DropDownComponent({ contextValue, children }) {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  // const [open, setOpen] = useState(false);
  const { allPresets } = useContext(PageContext);
  const { fridge } = contextValue;
  const presetChosen = useFridgePreset(fridge.id_preset, allPresets);

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
      : "green";
  }

  const [bgColor, setBgColor] = useState(chooseColor());

  return (
    <>
      <DropDownComponentContext.Provider
        value={{ ...contextValue, presetChosen }}
      >
        <div className="list-element col-12">
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
                    <div className="row ">{children}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`${bgColor} list-element-title-unfold col-12`}
              onClick={() => handleClick()}
            >
              <div className="title-name">{fridge.name}</div>
              <div>{t(`${fridge.status.label_trad}`)}</div>
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
