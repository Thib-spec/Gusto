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

export default function FridgeProduitCard(props) {

  useEffect(() => {
    console.log("mount")
    getProductsInFridge();
  }, []);

  async function getProductsInFridge() {
    try {
      console.log(props.fridge.id)
      const res = await api.getProductsInFridge({id:props.fridge.id});
      if (res.ok) {
        const resJSON = await res.json();
        setProducts(resJSON)
      } else {
        
      }
    } catch (error) {
      console.log(error)
      
    }
  }

  const [products, setProducts] = useState([]);

  const [productsToAdd, setProductsToAdd] = useState([
    { name: "Raisin" },
    { name: "Pomme" },
  ]);
  

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleAddProductButton(event) {}

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
                </tbody>
              </table>
            </p>
            <div className="row justify-content-center mb-2">
              <div class="col m-1" align="center">
                <button
                  onClick={handleShow}
                  type="submit"
                  className="btn btn-dark blue m-1"
                >
                  Add a product
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
            {productsToAdd.map((product) => {
              return (
                <div className={`card`} key={product.id}>
                  <div className="card-body p-5 text-center">
                    <div className="">
                      <img className="card-img-top" alt="Card image cap" />
                    </div>
                    <h5 class="card-title">{product.name}</h5>
                    <hr className="my-2" />
                    <div className="">
                      <label className="form-check-label">
                        Mot de passe oublié ?
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </Page>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
