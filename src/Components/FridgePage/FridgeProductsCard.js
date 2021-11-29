// component utilisé dans le déroulant d'un fridge pour gérer les produits

import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";

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

export default function FridgeProductsCard(props) {
  // produits déjà ajoutés dans le frigo
  const [products, setProducts] = useState([]);
  // produits pouvant être ajoutés dans le frigo
  const [productsToAdd, setProductsToAdd] = useState([]);
  // produits ajoutés dans le frigo mais pas encore save
  const [productsAdded, setProductsAdded] = useState(new Set([]));

  useEffect(() => {
    getProductsInFridge();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [products]);

  useEffect(() => {
    console.log([...productsAdded]);
    console.log([...products]);
  }, [productsAdded, products]);

  async function getProductsInFridge() {
    try {
      const res = await api.getProductsInFridge({ id: props.fridge.id });
      if (res.ok) {
        const resJSON = await res.json();
        setProducts(resJSON);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllProducts() {
    try {
      const res = await api.getAllProducts();
      if (res.ok) {
        const resJSON = await res.json();
        setProductsToAdd(
          resJSON.filter(
            (product) => !products.map((el) => el.id).includes(product.id)
          )
        );
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

  // handlers
  const handleAddOneProduct = (product, added) => {
    const newSet = new Set(productsAdded);
    if (added) newSet.delete(product);
    else newSet.add(product);
    setProductsAdded(newSet);
  };

  // ParentsProps
  const parentProps = {
    handlers: {
      handleAddOneProduct,
    },
    states: {
      products,
      productsAdded,
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
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    return (
                      <tr key={product.id}>
                        {/* <td>{product.id}</td> */}
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.min}</td>
                        <td>{product.max}</td>
                      </tr>
                    );
                  })}
                  {[...productsAdded].map((product) => {
                    return (
                      <tr key={product.id}>
                        {/* <td>{product.id}</td> */}
                        <td>{product.name}</td>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          min="1"
                          max="5"
                          defaultValue={product.quantity}
                        />
                        {/* <td>{product.quantity}</td> */}
                        <td>{product.min}</td>
                        <td>{product.max}</td>
                      </tr>
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
                  Remove a product
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
                  onClick={() => {}}
                  type="submit"
                  className="btn btn-dark blue m-1"
                >
                  Save
                </button>
                <button
                  onClick={() => {}}
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
              {productsToAdd.map((product) => {
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
