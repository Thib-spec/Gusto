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

import FridgeMenuTableLineOnlyReadable from "Components/PresetFridgePage/FridgeMenuTableLineOnlyReadable";

export default function FridgeMenusCard({ name }) {
  // produits ajoutés dans le frigo
  const menus = new ArrayController(useState([]), useState([]));
  const fridge = useContext(FridgeInfoContext);

  useEffect(() => {
    getMenusInFridge();
  }, []);

  // appels api
  async function getMenusInFridge() {
    try {
      console.log("WSHHHHH");
      const res = await api.getMenusInFridge({ id: fridge.id });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.getMenusInFridge() : ", resJSON);
        menus.set([...resJSON.map(mappers.menusMapper)], {
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
      <div className="col m-1" style={{ "min-width": "400px" }}>
        <div class="card text-center h-100">
          <div class="card-header">{name}</div>
          <div class="card-body">
            <p class="card-text">
              <table class="table table-striped">
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>Menu</th>
                  </tr>
                </thead>
                <tbody>
                  {menus.value.map((menu) => {
                    console.log(menu);
                    return (
                      <FridgeMenuTableLineOnlyReadable
                        key={menu.id}
                        menu={menus.get(menu)}
                      />
                    );
                  })}
                </tbody>
              </table>
            </p>
            <div className="row justify-content-center mb-2">
              <div class="col m-1" align="center"></div>
            </div>

            <div className="row justify-content-center">
              <div class="col-6 m-1" align="center"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
