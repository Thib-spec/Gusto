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

import MenuTableLine from "./MenuTableLine";

export default function FridgeMenusCard({ name }) {
  // menus ajoutés dans le frigo
  const menus = new ArrayController(useState([]), useState([]));
  const menusInPreset = new ArrayController(useState([]), useState([]));
  const { fridge, presetChosen } = useContext(DropDownComponentContext);

  useEffect(() => {
    getMenusInOneFridge();
  }, []);

  useEffect(() => {
    if (presetChosen.value.id != -1) getMenusInOnePreset();
  }, [presetChosen.value]);

  // useEffect(() => {
  //   console.log("menus : ", menus.value);
  // }, [menus]);

  // appels api
  async function getMenusInOneFridge() {
    try {
      const res = await api.getMenusInOneFridge({ id: fridge.id });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.getMenusInOneFridge() : ", resJSON);
        menus.set([...resJSON.map(mappers.menusMapper)], { init: true });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

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
                  {menus.value.map((menu) => {
                    return <MenuTableLine key={menu.id} menu={menu} />;
                  })}
                  {menusInPreset.value
                    .filter((menu) => {
                      const m = menus.get(menu);
                      if (m.value) {
                        return false;
                      } else return true;
                    })
                    .map((menu) => {
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
