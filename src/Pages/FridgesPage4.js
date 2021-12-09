// import "CSS/colors.css";
import React, { Component, useState, useEffect, createContext } from "react";
import Page from "Components/Page";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import mappers from "helpers/mappers";

import DropDownComponentContext from "Context/FridgeDropDownComponentContext";
import ProductsCard from "Components/FridgePage2/ProductsCard";
import MenusCard from "Components/FridgePage2/MenusCard";
import DropDownComponent from "Components/FridgePage2/DropDownComponent";
import LogsCard from "Components/FridgePage2/LogsCard";
import GestionCard from "Components/FridgePage2/GestionCard";
import DropDownPresetChoose from "Components/FridgePage2/DropDownPresetChoose";

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

  const [fridge, setFridges] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allMenus, setAllMenus] = useState([]);

  return (
    <>
      <DropDownComponentContext.Provider
        value={{
          getAllProducts: allProducts,
          getAllMenus: allMenus,
        }}
      >
        <Page>
          {fridge.map((fridge) => {
            return (
              <DropDownComponent fridge={fridge} key={fridge.id}>
                <DropDownPresetChoose />
                <div className="w-100"></div>
                <ProductsCard name="Produits" />
                <MenusCard name="Menus" />
                <div className="w-100"></div>
                <LogsCard name="Logs" idFridge={fridge.id} />
                <GestionCard name="Gestion VMC" />
              </DropDownComponent>
            );
          })}
        </Page>
      </DropDownComponentContext.Provider>
    </>
  );
}
