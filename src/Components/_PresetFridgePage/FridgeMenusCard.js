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
import FridgeAddModal from "./FridgeAddModal";
import FridgeDropDownContext from "Context/FridgeDropDownContext";
import FridgeInfoContext from "Context/FridgeInfoContext";

// const menus = [
//   { id: 0, name: "Midi Lunch"},
//   { id: 1, name: "Soir Lunch"},
// ];

import FridgeMenuCard from "Components/_PresetFridgePage/FridgeMenuCard";
import FridgeMenuTableLine from "Components/_PresetFridgePage/FridgeMenuTableLine";

export default function FridgeMenusCard({ name }) {
  // menus ajoutés dans le frigo
  const menus = new ArrayController(useState([]), useState([]));
  const { allMenus } = useContext(FridgeDropDownContext);
  const fridge = useContext(FridgeInfoContext);

  useEffect(() => {
    getMenusInFridge();
  }, []);

  // appels api
  async function getMenusInFridge() {
    try {
      const res = await api.getMenusInFridge({ id: fridge.id });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.getMenusInFridge() : ", resJSON);
        menus.set([...resJSON.map(mappers.menusMapper)], { init: true });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addMenusInFridge() {
    try {
      const res = await api.addMenusInFridge({
        id: fridge.id,
        body: menus.value,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.addMenusInFridge() : ", resJSON);
        menus.addOrUpdateMany([], { init: true });
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

  // Save & Cancel
  const handleSaveButton = () => {
    addMenusInFridge();
  };
  const handleCancelButton = () => {
    menus.reset();
  };

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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {menus.value.map((menu) => {
                    return (
                      <FridgeMenuTableLine
                        key={menu.id}
                        menu={menus.get(menu)}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="row justify-content-center mb-2">
              <div className="col m-1" align="center">
                <button
                  onClick={handleAddMenus}
                  type="submit"
                  className="btn btn-dark blue m-1"
                >
                  Add menus
                </button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-6 m-1" align="center">
                <button
                  onClick={handleSaveButton}
                  type="submit"
                  className="btn btn-dark blue m-1"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelButton}
                  type="submit"
                  className="btn btn-dark blue m-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          {/* <div className="card-footer text-muted">Produits</div> */}
        </div>
      </div>

      {/* Modal pour checker les produits a ajouter */}
      <FridgeAddModal show={show} onHide={handleClose} title="Add menus">
        <Page>
          <div className="row">
            {allMenus.map((menu) => {
              return (
                <FridgeMenuCard
                  key={menu.id}
                  menu={menu}
                  parentProps={parentProps}
                />
              );
            })}
          </div>
        </Page>
      </FridgeAddModal>
    </>
  );
}
