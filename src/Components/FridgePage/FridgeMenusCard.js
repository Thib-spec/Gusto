// component utilisé dans le déroulant d'un fridge pour gérer les menus

import React, { Component, useState } from "react";
import Page from "Components/Page";
import { Accordion, Row, Table, Card } from "react-bootstrap";

const menus = [
  { id: 0, name: "Midi Lunch"},
  { id: 1, name: "Soir Lunch"},
];

export default function FridgeMenuCard({ name }) {
  return (
    <div className="col m-1" style={{ "min-width": "400px" }}>
      <div class="card text-center h-100">
        <div class="card-header">{name}</div>
        <div class="card-body">
          <p class="card-text">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Menu</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((menu) => {
                  return (
                    <tr key={menu.id}>
                      <td>{menu.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </p>
          <a href="#" class="btn btn-primary m-1">
            Add a menu
          </a>
          <a href="#" class="btn btn-primary m-1">
            Remove a menu
          </a>
        </div>
        {/* <div class="card-footer text-muted">Produits</div> */}
      </div>
    </div>
  );
}
