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

import AddModal from "./AddModal";
import InfoContext from "Context/PresetInfoContext";
import DropDownContext from "Context/PresetDropDownComponentContext";

import MenuCard from "./MenuCard";
import MenuTableLine from "./MenuTableLine";

export default function FridgeMenusCard({ name }) {
  // menus ajoutés dans le frigo
  const menus = new ArrayController(useState([]), useState([]));
  const { allMenus } = useContext(DropDownContext);
  const preset = useContext(InfoContext);

  useEffect(() => {
    getMenusInPreset();
  }, []);

  // useEffect(() => {
  //   console.log("menus : ", menus.value);
  // }, [menus]);

  // appels api
  async function getMenusInPreset() {
    try {
      const res = await api.getMenusInPreset({ id: preset.id });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.getMenusInPreset() : ", resJSON);
        menus.set([...resJSON.map(mappers.menusMapper)], { init: true });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addMenusInPreset() {
    try {
      const body = menus.value.map(reverse_mappers.menusMapper);
      console.log("BODY api.addProductsInPreset() : ", body);
      const res = await api.addMenusInPreset({
        id: preset.id,
        body,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.addMenusInPreset() : ", resJSON);
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
    addMenusInPreset();
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
                      <MenuTableLine key={menu.id} menu={menus.get(menu)} />
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
        </div>
      </div>

      {/* Modal pour checker les produits a ajouter */}
      <AddModal show={show} onHide={handleClose} title="Add menus">
        <Page>
          <div className="row">
            {allMenus.map((menu) => {
              return (
                <MenuCard key={menu.id} menu={menu} parentProps={parentProps} />
              );
            })}
          </div>
        </Page>
      </AddModal>
    </>
  );
}
