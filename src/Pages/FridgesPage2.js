// import "CSS/colors.css";
import React, { Component, useState, useEffect } from "react";
import Page from "Components/Page";
import { Accordion, Row, Table, Card } from "react-bootstrap";
import FridgeProduitCard from "Components/FridgePage/FridgeProductsCard";
import FridgeAccordion from "Components/FridgePage/FridgeAccordion";
import FridgeDropDownComponent from "Components/FridgePage/FridgeDropDownComponent";
import DropDownComponent from "Components/DropDownComponent";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";

import mappers from "helpers/mappers"

export default function FridgesPage() {
  function handleNothing() {}

  useEffect(() => {
    getFridges();
    getAllProducts();
    getAllMenus();
  }, []);

  async function getFridges() {
    try {
      const res = await api.getFridges();
      if (res.ok) {
        const resJSON = await res.json();
        setFridges(
          resJSON.map(mappers.fridgesMapper)
        );
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
        setAllProducts(resJSON.map(mappers.productsMapper));
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllMenus() {
    try {
      const res = await api.getAllMenus();
      if (res.ok) {
        const resJSON = await res.json();
        setAllMenus(resJSON.map(mappers.menusMapper));
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  const status = [
    { id: 1, message: "En production", inProduction: true },
    { id: 2, message: "Hors service", horsService: true },
    { id: 3, message: "Livraison en cours", livraison: true },
  ];

  const [fridges, setFridges] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allMenus, setAllMenus] = useState([]);

  return (
    <>
      <Page>
        {/* test avec Accordion de Boostrap : ne marche pas */}
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>

          {/* <FridgeAccordion
            id={2}
            fridgeName="FRIDGE #2"
            fridgeStatus="En production"
          /> */}
        </Accordion>
        {/* fin test avec Accordion de Boostrap */}

        {fridges.map((fridge) => {
          return (
            <FridgeDropDownComponent
              fridge={fridge}
              idFridge={fridge.id}
              allProducts={allProducts}
              allMenus={allMenus}
            />
          );
        })}
      </Page>
    </>
  );
}
