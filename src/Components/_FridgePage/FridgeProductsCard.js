// component utilisé dans le déroulant d'un fridge pour gérer les produits

import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import ArrayController from "helpers/ArrayController";
import mappers from "helpers/mappers";

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

import FridgeProductCard from "./FridgeProductCard";
import FridgeProductTableLine from "./FridgeProductTableLine";

export default function FridgeProductsCard(props) {
  // produits ajoutés dans le frigo
  const products = new ArrayController(useState([]), useState([]));

  useEffect(() => {
    getProductsInOneFridge();
  }, []);

  // useEffect(() => {
  //   console.log("products : ", products);
  // }, [products.value]);

  // appels api
  async function getProductsInOneFridge() {
    try {
      const res = await api.getProductsInOneFridge({ id: props.fridge.id });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.getProductsInOneFridge() : ", resJSON);
        products.set(resJSON.Products.map(mappers.productsInFridge), {
          init: true,
        });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductsInOneFridge() {
    try {
      const res = await api.addProductsInOneFridge({
        id: props.fridge.id,
        body: products.value,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.addProductsInOneFridge() : ", resJSON);
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
    addProductsInOneFridge();
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
      <div className="col m-1" style={{ minWidth: "400px" }}>
        <div className="card text-center h-100">
          <div className="card-header">{props.name}</div>
          <div className="card-body">
            <div className="card-text">
              <table className="table table-striped">
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
                        product={products.get(product)}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="row justify-content-center mb-2">
              <div className="col m-1" align="center">
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
