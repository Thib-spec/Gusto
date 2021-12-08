// component utilisé dans le déroulant d'un fridge pour gérer les produits

import React, { Component, useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import ArrayController from "helpers/ArrayController";
import mappers from "helpers/mappers";
import reverse_mappers from "helpers/reverse_mappers";

import AddModal from "./AddModal";
import InfoContext from "Context/PresetInfoContext";
import DropDownContext from "Context/PresetDropDownComponentContext";

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

import ProductCard from "./ProductCard";
import ProductTableLine from "./ProductTableLine";

export default function ProductsCard({ name }) {
  // produits ajoutés dans le frigo
  const products = new ArrayController(useState([]), useState([]));
  const { getAllProducts } = useContext(DropDownContext);
  const preset = useContext(InfoContext);

  useEffect(() => {
    getProductsInPreset();
  }, []);

  useEffect(() => {
    console.log("value : ", products.value);
  }, [products]);

  // appels api
  async function getProductsInPreset() {
    try {
      const res = await api.getProductsInPreset({ id: preset.id });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.getProductsInPreset() : ", resJSON);
        products.set(resJSON.map(mappers.productsInPreset), {
          init: true,
        });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductsInPreset() {
    try {
      const body = products.value.map(reverse_mappers.productsInPreset);
      console.log("BODY api.addProductsInPreset() : ", body);
      const res = await api.addProductsInPreset({
        id: preset.id,
        body,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.addProductsInPreset() : ", resJSON);
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
    addProductsInPreset();
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
                    <th>Min</th>
                    <th>Max</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.value.map((product) => {
                    return (
                      <ProductTableLine
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
      <AddModal show={show} onHide={handleClose} title="Add products">
        <Page>
          <div className="row">
            {getAllProducts.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  parentProps={parentProps}
                />
              );
            })}
          </div>
        </Page>
      </AddModal>
    </>
  );
}
