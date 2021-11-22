import React, { Component, useState } from "react";
import Page from "Components/Page";
import { Accordion, Row, Table, Card } from "react-bootstrap";

const products = [
  { id: 0, name: "Banane", quantity: 2, min: 10, max: 10 },
  { id: 1, name: "Kiwi", quantity: 2, min: 10, max: 10 },
  { id: 2, name: "Ananas", quantity: 2, min: 10, max: 10 },
];

export default function FrigesProduitCard({ name }) {
  return (
    // <div className="col red m-1 col-lg-6 col-md-12 col-sm-12">
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
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Min</th>
                  <th>Max</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr>
                      {/* <td>{product.id}</td> */}
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.min}</td>
                      <td>{product.max}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </p>
          <div className="row justify-content-center mb-2">
            <div class="col m-1" align="center">
              <button
                onClick={() => {}}
                type="submit"
                className="btn btn-dark blue m-1"
              >
                Add a product
              </button>
              <button
                onClick={() => {}}
                type="submit"
                className="btn btn-dark blue m-1"
              >
                Remove a product
              </button>
              <button
                onClick={() => {}}
                type="submit"
                className="btn btn-dark blue m-1"
              >
                passer une commande
              </button>
            </div>
          </div>

          <div className="row justify-content-center">
            <div class="col-6 m-1" align="center">
              <button
                onClick={() => {}}
                type="submit"
                className="btn btn-dark blue m-1"
              >
                Save
              </button>
              <button
                onClick={() => {}}
                type="submit"
                className="btn btn-dark blue m-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* <div class="card-footer text-muted">Produits</div> */}
      </div>
    </div>
  );
}
