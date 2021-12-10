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

import FridgeProductCard from "./FridgeProductCard";
import FridgeProductTableLineOnlyReadable from "./FridgeProductTableLineOnlyReadable";

export default function FridgeProductsCard({ name }) {
  // produits ajoutés dans le frigo
  const products = new ArrayController(useState([]), useState([]));
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
                      <FridgeProductTableLineOnlyReadable
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
                  onClick={() => {}}
                  type="submit"
                  className="btn btn-dark blue m-1"
                >
                  passer une commande
                </button>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-6 m-1" align="center"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
