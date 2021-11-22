import React, { Component, useState } from "react";
import Page from "Components/Page";
import { Accordion, Row, Table, Card } from "react-bootstrap";

const menus = [
  { id: 0, name: "Midi Lunch"},
  { id: 1, name: "Soir Lunch"},
];

export default function FrigesMenuCard({ name }) {
  return (
    // <div className="col red m-1 col-lg-4 col-md-8 col-sm-12">
    <div className="col m-1" style={{ "min-width": "400px" }}>
      <div class="card text-center h-100">
        <div class="card-header">{name}</div>
        <div class="card-body">
          {/* <h5 class="card-title">Special title treatment</h5> */}
          <p class="card-text">
            <table class="table table-striped">
              <thead>
                <tr>
                  {/* <th>#</th> */}
                  <th>Menu</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((menu) => {
                  return (
                    <tr>
                      {/* <td>{product.id}</td> */}
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
