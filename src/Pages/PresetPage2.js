// import "CSS/colors.css";
import React, { Component, useState, useEffect, createContext } from "react";
import Page from "Components/Page";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import mappers from "helpers/mappers";
import CreatePresetButton from "Components/PresetPage/CreatePresetButton";

import ProductsCard from "Components/PresetPage/ProductsCard";
import MenusCard from "Components/PresetPage/MenusCard";
import DropDownComponent from "Components/PresetPage/DropDownComponent";
import ArrayController from "helpers/ArrayController";

export default function PresetsPage() {
  function handleNothing() {}

  useEffect(() => {
    getAllPresets();
    getAllProducts();
    getAllMenus();
  }, []);

  async function getAllPresets() {
    try {
      const res = await api.getAllPresets();
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.getAllPresets() : ", resJSON);
        allPresets.set(resJSON.map(mappers.presetsMapper));
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
        allProducts.set(resJSON.map(mappers.productsMapper));
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

  // const [presets, setPresets] = useState([]);
  // const [allProducts, setAllProducts] = useState([]);
  const allProducts = new ArrayController(useState, []);
  const allPresets = new ArrayController(useState, []);
  const [allMenus, setAllMenus] = useState([]);

  return (
    <>
      <Page
        contextValue={{
          allProducts: allProducts,
          allMenus: allMenus,
          allPresets: allPresets,
        }}
      >
        <CreatePresetButton />
        {allPresets.value.map((preset) => {
          return (
            <DropDownComponent contextValue={{ preset }} key={preset.id}>
              <ProductsCard name="Produits" />
              <MenusCard name="Menus" />
            </DropDownComponent>
          );
        })}
      </Page>
    </>
  );
}
