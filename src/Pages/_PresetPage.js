// import "CSS/colors.css";
import React, { Component, useState, useEffect, createContext } from "react";
import Page from "Components/Page";
import FridgeDropDownComponent from "Components/_PresetFridgePage/FridgeDropDownComponent";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import FridgeDropDownContext from "Context/FridgeDropDownContext";
import mappers from "helpers/mappers";
import FridgeProduitsCard from "Components/_PresetFridgePage/FridgeProductsCard";
import FridgeMenusCard from "Components/_PresetFridgePage/FridgeMenusCard";

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
      <FridgeDropDownContext.Provider
        value={{
          getAllProducts: allProducts,
          getAllMenus: allMenus,
        }}
      >
        <Page>
          {fridges.map((fridge) => {
            return (
              <FridgeDropDownComponent fridge={fridge}>
                <FridgeProduitsCard name="Produits" />
                <FridgeMenusCard name="Menus" />
              </FridgeDropDownComponent>
            );
          })}
        </Page>
      </FridgeDropDownContext.Provider>
    </>
  );
}