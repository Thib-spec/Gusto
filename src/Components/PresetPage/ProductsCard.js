// component utilisé dans le déroulant d'un fridge pour gérer les produits

import React, { Component, useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import ArrayController from "helpers/ArrayController";
import mappers from "helpers/mappers";
import reverse_mappers from "helpers/reverse_mappers";

import AddModal from "./AddModal";
import PageContext from "Context/PageContext";
import DropDownComponentContext from "Context/DropDownComponentContext";
import ProductsCardContext from "Context/ProductsCardContext";

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
  const { allProducts } = useContext(PageContext);
  const preset = useContext(DropDownComponentContext);

  useEffect(() => {
    getProductsInOnePreset();
  }, []);

  // useEffect(() => {
  //   console.log("products : ", products.value);
  // }, [products]);

  // appels api
  async function getProductsInOnePreset() {
    try {
      const res = await api.getProductsInOnePreset({ id: preset.id });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.getProductsInOnePreset() : ", resJSON);
        products.set(resJSON.Products.map(mappers.productsInPreset), {
          init: true,
        });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductsInOnePreset(addProducts) {
    try {
      const body = addProducts.map(reverse_mappers.productsInPreset);
      // const body = products.value.map(reverse_mappers.productsInPreset);
      const res = await api.addProductsInOnePreset({
        id: preset.id,
        body,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.addProductsInOnePreset() : ", resJSON);
        products.addOrUpdateMany([], { init: true });
        // addProducts.reset();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductsInOnePreset(removeProducts) {
    try {
      const body = removeProducts.map(reverse_mappers.productsInPreset);
      const res = await api.removeProductsInOnePreset({
        id: preset.id,
        body,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.addProductsInOnePreset() : ", resJSON);
        products.removeMany([], { init: true });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProductsInOnePreset(updateProducts) {
    try {
      const body = updateProducts.map(reverse_mappers.productsInPreset);
      const res = await api.updateProductsInOnePreset({
        id: preset.id,
        body,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.updateProductsInOnePreset() : ", resJSON);
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

  const processProducts = (products) => {
    const [addProducts, removeProducts, updateProducts] = [[], [], []];
    products.initValue.forEach((product) => {
      if (products.isElModified(product))
        updateProducts.push(products.find(product));
      else if (products.isElRemoved(product)) removeProducts.push(product);
    });
    products.value
      .filter(
        (product) =>
          !(
            products.initValue.findIndex(
              (JSONelement) => product.id == JSONelement.id
            ) > -1
          )
      )
      .forEach((product) => {
        addProducts.push(product);
      });
    return [addProducts, removeProducts, updateProducts];
  };

  // Save & Cancel
  const handleSaveButton = () => {
    const [addProducts, removeProducts, updateProducts] =
      processProducts(products);
    if (addProducts.length) addProductsInOnePreset(addProducts);
    if (removeProducts.length) removeProductsInOnePreset(removeProducts);
    if (updateProducts.length) updateProductsInOnePreset(updateProducts);
  };
  const handleCancelButton = () => {
    products.reset();
  };

  return (
    <>
      <ProductsCardContext.Provider
        value={{
          products,
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
                          // product={product}
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
        <AddModal show={show} onHide={handleClose} title="Add products">
          <Page>
            <div className="row">
              {allProducts.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          </Page>
        </AddModal>
      </ProductsCardContext.Provider>
    </>
  );
}
