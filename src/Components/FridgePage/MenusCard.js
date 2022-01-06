// component utilisé dans le déroulant d'un fridge pour gérer les menus

import React, { Component, useState, useEffect, useContext } from "react";
import Page from "Components/Page";
import {
  Accordion,
  Row,
  Col,
  Table,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import api from "helpers/api";
import ArrayController from "helpers/ArrayController";
import mappers from "helpers/mappers";
import reverse_mappers from "helpers/reverse_mappers";

import DropDownComponentContext from "Context/DropDownComponentContext";
import PageContext from "Context/PageContext";

import MenuTableLine from "./MenuTableLine";
import useFridgePreset from "./useFridgePreset";

export default function FridgeMenusCard({ name }) {
  // menus ajoutés dans le frigo
  const menus = new ArrayController(useState, []);
  const menusInPreset = new ArrayController(useState, []);
  const { fridge, presetChosen } = useContext(DropDownComponentContext);

  useEffect(() => {
    if (presetChosen.value.id != -1) getMenusInOnePreset();
  }, [presetChosen.value]);

  async function getMenusInOnePreset() {
    try {
      const res = await api.getMenusInOnePreset({
        id: presetChosen.value.id,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.getMenusInOnePreset() : ", resJSON);
        menusInPreset.set(resJSON.map(mappers.menusInPreset), {
          init: true,
        });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  // modal addProducts Button
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleAddMenus = handleShow;

  // ParentsProps
  const parentProps = {
    states: {
      menus,
    },
  };

  return (
    <>
      <div className="col m-1" style={{ minWidth: "400px" }}>
        <div className="card text-center h-100">
          <div className="card-header">{name}</div>
          <div className="card-body">
            <div className="card-text">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Menu</th>
                  </tr>
                </thead>
                <tbody>
                  {menusInPreset.value.map((menu) => {
                    return <MenuTableLine key={menu.id} menu={menu} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
