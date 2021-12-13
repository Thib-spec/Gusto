// component utilisé dans le déroulant d'un fridge pour gérer les menus

import React, { Component, useState, useEffect } from "react";
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

// const menus = [
//   { id: 0, name: "Midi Lunch"},
//   { id: 1, name: "Soir Lunch"},
// ];

import FridgeMenuCard from "./FridgeMenuCard";
import FridgeMenuTableLine from "./FridgeMenuTableLine";

export default function FridgeMenusCard(props) {
  // menus ajoutés dans le frigo
  const menus = new ArrayController(useState([]), useState([]));

  useEffect(() => {
    getMenusInOneFridge();
  }, []);

  // appels api
  async function getMenusInOneFridge() {
    try {
      const res = await api.getMenusInOneFridge({ id: props.fridge.id });
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

  async function addMenusInOneFridge() {
    try {
      const res = await api.addMenusInOneFridge({
        id: props.fridge.id,
        body: menus.value,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.addMenusInOneFridge() : ", resJSON);
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
    addMenusInOneFridge();
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
          <div className="card-header">{props.name}</div>
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
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="mymodal"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add menus
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          {/* <div className=""></div> */}
          <Page>
            <div className="row">
              {props.allMenus.map((menu) => {
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
