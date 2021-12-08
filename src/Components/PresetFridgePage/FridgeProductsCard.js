// component utilisé dans le déroulant d'un fridge pour gérer les produits

import React, { Component, useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import ArrayController from "helpers/ArrayController";
import mappers from "helpers/mappers";
import FridgeAddModal from "./FridgeAddModal";
import FridgeInfoContext from "Context/FridgeInfoContext";
import FridgeDropDownContext from "Context/FridgeDropDownContext";

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

import FridgeProductCard from "Components/PresetFridgePage/FridgeProductCard";
import FridgeProductTableLine from "Components/PresetFridgePage/FridgeProductTableLine";

export default function FridgeProductsCard({ name }) {
  // produits ajoutés dans le frigo
  const products = new ArrayController(useState([]), useState([]));
  const { getAllProducts } = useContext(FridgeDropDownContext);
  const fridge = useContext(FridgeInfoContext);

  useEffect(() => {
    getProductsInFridge();
  }, []);

  // appels api
  async function getProductsInFridge() {
    try {
      const res = await api.getProductsInFridge({ id: fridge.id });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.getProductsInFridge() : ", resJSON);
        products.set(resJSON.Products.map(mappers.productsInFridge), {
          init: true,
        });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductsInFridge() {
    try {
      const res = await api.addProductsInFridge({
        id: fridge.id,
        body: products.value,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.addProductsInFridge() : ", resJSON);
        products.addOrUpdateMany([], { init: true });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  // modal addProducts Button
  const [show, setShow] = useState(false);
  const handleAddProducts = () => setShow(true);
  const handleClose = () => setShow(false);

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
          <div class="card-header">{name}</div>
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
                        product={products.get(product)}
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
      <FridgeAddModal show={show} onHide={handleClose} title="Add products">
        <Page>
          <div className="row">
            {getAllProducts.map((product) => {
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
      </FridgeAddModal>
    </>
  );
}
