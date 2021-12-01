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

// const menus = [
//   { id: 0, name: "Midi Lunch"},
//   { id: 1, name: "Soir Lunch"},
// ];

import FridgeMenuCard from "Components/FridgePage/FridgeMenuCard";
import FridgeMenuTableLine from "Components/FridgePage/FridgeMenuTableLine";

export default function FridgeMenusCard(props) {
  // menus ajoutés dans le frigo
  const menus = new ArrayController(useState([]), useState([]));

  useEffect(() => {
    getMenusInFridge();
  }, []);

  // appels api
  async function getMenusInFridge() {
    try {
      const res = await api.getMenusInFridge({ id: props.fridge.id });
      if (res.ok) {
        const resJSON = await res.json();
        menus.set([...resJSON], { init: true });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addMenusInFridge() {
    try {
      const res = await api.addMenusInFridge({
        id: props.fridge.id,
        body: menus.value,
      });
      if (res.ok) {
        const resJSON = await res.json();
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
      <div className="col m-1" style={{ "min-width": "400px" }}>
        <div class="card text-center h-100">
          <div class="card-header">{props.name}</div>
          <div class="card-body">
            <p class="card-text">
              <table class="table table-striped">
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
                        menu={menus.get(menu.id)}
                      />
                    );
                  })}
                </tbody>
              </table>
            </p>
            <div className="row justify-content-center mb-2">
              <div class="col m-1" align="center">
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
              <div class="col-6 m-1" align="center">
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
          {/* <div class="card-footer text-muted">Produits</div> */}
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
