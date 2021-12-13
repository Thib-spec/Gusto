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
import PageContext from "Context/PageContext";
import DropDownComponentContext from "Context/DropDownComponentContext";
import MenusCardContext from "Context/MenusCardContext";

import MenuCard from "./MenuCard";
import MenuTableLine from "./MenuTableLine";

export default function FridgeMenusCard({ name }) {
  // menus ajoutés dans le frigo
  const menus = new ArrayController(useState([]), useState([]));
  const { allMenus } = useContext(PageContext);
  const preset = useContext(DropDownComponentContext);

  useEffect(() => {
    getMenusInOnePreset();
  }, []);

  // useEffect(() => {
  //   console.log("menus : ", menus.value);
  // }, [menus]);

  // appels api
  async function getMenusInOnePreset() {
    try {
      const res = await api.getMenusInOnePreset({ id: preset.id });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.getMenusInOnePreset() : ", resJSON);
        menus.set([...resJSON.map(mappers.menusMapper)], { init: true });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async function addMenusInOnePreset() {
  //   try {
  //     const body = menus.value.map(reverse_mappers.menusMapper);
  //     const res = await api.addMenusInOnePreset({
  //       id: preset.id,
  //       body,
  //     });
  //     if (res.ok) {
  //       const resJSON = await res.json();
  //       console.log("api.addMenusInOnePreset() : ", resJSON);
  //       menus.addOrUpdateMany([], { init: true });
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function addMenusInOnePreset(addMenus) {
    try {
      const body = addMenus.map(reverse_mappers.menusInPreset);
      // const body = products.value.map(reverse_mappers.productsInPreset);
      const res = await api.addMenusInOnePreset({
        id: preset.id,
        body,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.addMenusInOnePreset() : ", resJSON);
        menus.addOrUpdateMany([], { init: true });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeMenusInOnePreset(removeMenus) {
    try {
      const body = removeMenus.map(reverse_mappers.menusInPreset);
      const res = await api.removeMenusInOnePreset({
        id: preset.id,
        body,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.removeMenusInOnePreset() : ", resJSON);
        menus.removeMany([], { init: true });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  const processMenus = (menus) => {
    const [addMenus, removeMenus] = [[], [], []];
    menus.initValue.forEach((menu) => {
      if (menus.isElRemoved(menu)) removeMenus.push(menu);
    });
    menus.value
      .filter(
        (menu) =>
          !(
            menus.initValue.findIndex(
              (JSONelement) => menu.id == JSONelement.id
            ) > -1
          )
      )
      .forEach((menu) => {
        addMenus.push(menu);
      });
    return [addMenus, removeMenus];
  };

  // modal addMenus Button
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleAddMenus = handleShow;

  // Save & Cancel
  // const handleSaveButton = () => {
  //   addMenusInOnePreset();
  // };
  const handleSaveButton = () => {
    const [addMenus, removeMenus] = processMenus(menus);
    if (addMenus.length) addMenusInOnePreset(addMenus);
    if (removeMenus.length) removeMenusInOnePreset(removeMenus);
  };
  const handleCancelButton = () => {
    menus.reset();
  };

  return (
    <>
      <MenusCardContext.Provider
        value={{
          menus,
        }}
      >
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
                return <MenuCard key={menu.id} menu={menu} />;
              })}
            </div>
          </Page>
        </AddModal>
      </MenusCardContext.Provider>
    </>
  );
}
