import React, { Component, useState } from "react";
import Page from "Components/Page";
import { Accordion, Row, Table, Card } from "react-bootstrap";

const menus = [
  { id: 0, name: "Midi Lunch"},
  { id: 1, name: "Soir Lunch"},
];

export default function FrigesMenuCard({ name }) {
  return (
    <div class="card text-center h-100">
      <div class="card-header">{name}</div>
      <div class="card-body">
        {/* <h5 class="card-title">Special title treatment</h5> */}
        <p class="card-text">
          <Table striped bordered hover>
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
          </Table>
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
  );
}
