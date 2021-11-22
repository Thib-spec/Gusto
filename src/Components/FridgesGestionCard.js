import React, { Component, useState } from "react";
import Page from "Components/Page";
import { Accordion, Row, Table, Card } from "react-bootstrap";

export default function FrigesProduitCard({ name }) {
  return (
    <div className="col m-1" style={{ "min-width": "400px" }}>
      <div class="card text-center h-100">
        <div class="card-header">{name}</div>
        <div class="card-body">
          {/* <h5 class="card-title">Special title treatment</h5> */}
          <p class="card-text">
            <div className="row">
              <div className="col"></div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col"></div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col"></div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col"></div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col"></div>
              <div className="col"></div>
            </div>
          </p>
          <a href="#" class="btn btn-primary m-1">
            Add a product
          </a>
          <a href="#" class="btn btn-primary m-1">
            Remove a product
          </a>
          <a href="#" class="btn btn-primary m-1">
            passer une commande
          </a>
        </div>
        {/* <div class="card-footer text-muted">Produits</div> */}
      </div>
    </div>
  );
}
