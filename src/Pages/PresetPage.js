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
import Value from "helpers/Value";

export default function PresetsPage() {
  function handleNothing() {}
  const isLoading = new Value(useState, true);


  // useEffect(() => {
  //   getAllPresets();
  //   getAllProducts();
  //   getAllMenus();
  // }, []);

  useEffect(() => {
    Promise.all([getAllPresets(), getAllProducts(),getAllMenus()])
      .then(() => {
        isLoading.set(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getAllPresets() {
    return new Promise(async (resolve,reject)=>{
      try {
        const res = await api.getAllPresets();
        if (res.ok) {
          const resJSON = await res.json();
          console.log("api.getAllPresets() : ", resJSON);
          allPresets.set(resJSON.map(mappers.presetsMapper));
          return resolve()
        } else {
        }
      } catch (error) {
        console.log(error);
        return reject(error)
      }
    })
  }

  function getAllProducts() {
    return new Promise(async (resolve,reject)=>{
      try {
        const res = await api.getAllProducts();
        if (res.ok) {
          const resJSON = await res.json();
          console.log("api.getAllProducts() : ", resJSON);
          allProducts.set(resJSON.map(mappers.productsMapper));
          return resolve()
        } else {
        }
      } catch (error) {
        console.log(error);
        return reject(error)
      }
    })
  }

  function getAllMenus() {
    return new Promise(async (resolve,reject)=>{
      try {
        const res = await api.getAllMenus();
        if (res.ok) {
          const resJSON = await res.json();
          console.log("api.getAllMenus() : ", resJSON);
          setAllMenus(resJSON.map(mappers.menusMapper));
          return resolve()
        } else {
        }
      } catch (error) {
        console.log(error);
        return reject(error)
      }
    })
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
        isLoading={isLoading.value}
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
