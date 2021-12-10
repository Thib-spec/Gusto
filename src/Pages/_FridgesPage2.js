// import "CSS/colors.css";
import React, { Component, useState, useEffect, createContext } from "react";
import Page from "Components/Page";
import { Accordion, Row, Table, Card } from "react-bootstrap";
import FridgeProduitCard from "Components/_FridgePage/FridgeProductsCard";
import FridgeAccordion from "Components/_FridgePage/FridgeAccordion";
import FridgeDropDownComponent from "Components/_FridgePage/FridgeDropDownComponent";
import DropDownComponent from "Components/DropDownComponent";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";

import mappers from "helpers/mappers";
import FridgeProduitsCard from "Components/_FridgePage/FridgeProductsCard";
import FridgeMenusCard from "Components/_FridgePage/FridgeMenusCard";

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
        console.log("api.getFridges() : ", resJSON);
        setFridges(resJSON.map(mappers.fridgesMapper));
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
        console.log("api.getAllProducts() : ", resJSON);
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
        console.log("api.getAllMenus() : ", resJSON);
        setAllMenus(resJSON.map(mappers.menusMapper));
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          return (<div>
            {console.log(fridge.id)}

            <FridgeDropDownComponent
              fridge={fridge}
              idFridge={fridge.id}
              allProducts={allProducts}
              allMenus={allMenus}
            />
          </div>
            
          );
        })}
      </Page>
    </>
  );
}
