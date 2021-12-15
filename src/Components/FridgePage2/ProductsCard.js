// component utilisé dans le déroulant d'un fridge pour gérer les produits

import React, { Component, useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import ArrayController from "helpers/ArrayController";
import mappers from "helpers/mappers";
import reverse_mappers from "helpers/reverse_mappers";

import DropDownComponentContext from "Context/DropDownComponentContext";
import PageContext from "Context/PageContext";
import useFridgePreset from "./useFridgePreset";

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

import ProductTableLine from "./ProductTableLine";

export default function ProductsCard({ name }) {
  // produits ajoutés dans le frigo
  const products = new ArrayController(useState, []);
  const productsInPreset = new ArrayController(useState, []);
  const { fridge, presetChosen } = useContext(DropDownComponentContext);

  useEffect(() => {
    getProductsInOneFridge();
  }, []);

  useEffect(() => {
    if (presetChosen.value.id != -1) getProductsInOnePreset();
  }, [presetChosen.value]);

  // appels api
  async function getProductsInOneFridge() {
    try {
      const res = await api.getProductsInOneFridge({ id: fridge.id });
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

  async function getProductsInOnePreset() {
    try {
      const res = await api.getProductsInOnePreset({
        id: presetChosen.value.id,
      });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.getProductsInOnePreset() : ", resJSON);
        productsInPreset.set(resJSON.Products.map(mappers.productsInPreset), {
          init: true,
        });
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
          <div className="card-header">{name}</div>
          <div className="card-body">
            <div className="card-text">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Min</th>
                    <th>Max</th>
                  </tr>
                </thead>
                <tbody>
                  {products.value.map((product) => {
                    const p = productsInPreset.get(product);
                    return (
                      <ProductTableLine
                        key={product.id}
                        product={
                          p.value
                            ? {
                                ...product,
                                min: p.value.min,
                                max: p.value.max,
                              }
                            : { ...product, min: 0, max: 0 }
                        }
                      />
                    );
                  })}
                  {productsInPreset.value
                    .filter((product) => {
                      const p = products.get(product);
                      if (p.value) {
                        return false;
                      } else return true;
                    })
                    .map((product) => {
                      return (
                        <ProductTableLine key={product.id} product={product} />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
