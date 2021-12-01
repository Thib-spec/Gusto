// component utilisé dans le déroulant d'un fridge pour gérer les produits

import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import ArrayController from "helpers/ArrayController";

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

import FridgeProductCard from "Components/FridgePage/FridgeProductCard";
import FridgeProductTableLine from "Components/FridgePage/FridgeProductTableLine";

export default function FridgeProductsCard(props) {
  // produits ajoutés dans le frigo
  const products = new ArrayController(useState([]), useState([]));

  useEffect(() => {
    getProductsInFridge();
  }, []);

  // useEffect(() => {
  //   console.log("products : ", products);
  // }, [products.value]);

  // appels api
  async function getProductsInFridge() {
    try {
      const res = await api.getProductsInFridge({ id: props.fridge.id });
      if (res.ok) {
        const resJSON = await res.json();
        products.set([...resJSON], { init: true });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductsInFridge() {
    try {
      const res = await api.addProductsInFridge({
        id: props.fridge.id,
        body: products.value,
      });
      if (res.ok) {
        const resJSON = await res.json();
        products.addOrUpdateMany([], { init: true });
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
  const handleAddProducts = handleShow;

  // Save & Cancel
  const handleSaveButton = () => {
    addProductsInFridge();
  };
  const handleCancelButton = () => {
    products.reset();
  };

  // ParentsProps
  const parentProps = {
    states: {
      products,
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
                    {/* <th>#</th> */}
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Min</th>
                    <th>Max</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.value.map((product) => {
                    return (
                      <FridgeProductTableLine
                        key={product.id}
                        product={products.get(product.id)}
                      />
                    );
                  })}
                </tbody>
              </table>
            </p>
            <div className="row justify-content-center mb-2">
              <div class="col m-1" align="center">
                <button
                  onClick={handleAddProducts}
                  type="submit"
                  className="btn btn-dark blue m-1"
                >
                  Add products
                </button>
                <button
                  onClick={() => {}}
                  type="submit"
                  className="btn btn-dark blue m-1"
                >
                  passer une commande
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
            Add products
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          {/* <div className=""></div> */}
          <Page>
            <div className="row">
              {props.allProducts.map((product) => {
                return (
                  <FridgeProductCard
                    key={product.id}
                    product={product}
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
