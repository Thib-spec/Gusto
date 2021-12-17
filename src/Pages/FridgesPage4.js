// import "CSS/colors.css";
import React, { Component, useState, useEffect, createContext } from "react";
import Page from "Components/Page";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import mappers from "helpers/mappers";

import ProductsCard from "Components/FridgePage2/ProductsCard";
import MenusCard from "Components/FridgePage2/MenusCard";
import DropDownComponent from "Components/FridgePage2/DropDownComponent";
import LogsCard from "Components/FridgePage2/LogsCard";
import GestionCard from "Components/FridgePage2/GestionCard";
import DropDownPresetChoose from "Components/FridgePage2/DropDownPresetChoose";

import Value from "helpers/Value";
import { isRejected } from "@reduxjs/toolkit";

export default function FridgesPage() {
  function handleNothing() {}
  const isLoading = new Value(useState, true);

  // useEffect(() => {
  //   getAllFridges();
  //   getAllPresets();
  //   isLoading.set(true);
  // }, []);

  useEffect(() => {
    Promise.all([getAllFridges(), getAllPresets()])
      .then(() => {
        isLoading.set(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("isLoading : ", isLoading.value);
  }, [isLoading.value]);

  // async function getAllFridges() {
  //   try {
  //     const res = await api.getAllFridges();
  //     if (res.ok) {
  //       const resJSON = await res.json();
  //       console.log("api.getAllFridges() : ", resJSON);
  //       console.log(
  //         "api.getAllFridges() : ",
  //         resJSON.map(mappers.fridgesMapper)
  //       );
  //       setFridges(resJSON.map(mappers.fridgesMapper));
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function getAllFridges() {
    return new Promise((resolve, reject) => {
      api
        .getAllFridges()
        .then((res) => {
          if (res.ok) {
            res
              .json()
              .then((data) => {
                console.log("api.getAllFridges() : ", data);
                setFridges(data.map(mappers.fridgesMapper));
                resolve();
              })
              .catch((err) => {
                reject(err);
              });
          } else {
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // async function getAllPresets() {
  //   try {
  //     const res = await api.getAllPresets();
  //     if (res.ok) {
  //       const resJSON = await res.json();
  //       console.log("api.getAllPresets() : ", resJSON);
  //       setAllPresets(resJSON.map(mappers.presetsMapper));
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function getAllPresets() {
    return new Promise((resolve, reject) => {
      api
        .getAllPresets()
        .then((res) => {
          if (res.ok) {
            res
              .json()
              .then((data) => {
                console.log("api.getAllPresets() : ", data);
                setAllPresets(data.map(mappers.presetsMapper));
                resolve();
              })
              .catch((err) => {
                reject(err);
              });
          } else {
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  const [fridges, setFridges] = useState([]);
  const [allPresets, setAllPresets] = useState([]);

  return (
    <>
      <Page
        contextValue={{
          allPresets: allPresets,
        }}
        isLoading={isLoading}
      >
        {fridges.map((fridge) => {
          return (
            <DropDownComponent contextValue={{ fridge }} key={fridge.id}>
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
    </>
  );
}
