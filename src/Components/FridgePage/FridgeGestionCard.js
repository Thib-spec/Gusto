// component utilisé dans le déroulant d'un fridge pour gérer la VMC

import React, { Component, useState } from "react";
import Page from "Components/Page";
import { Accordion, Row, Table, Card } from "react-bootstrap";
import "../../CSS/fridgeGestionCard.scss"
import ButtonFridge from "./ButtonFridge";

export default function FridgeProduitCard({ name }) {
  return (
    <div className="col m-1" style={{ "min-width": "400px" }}>
      <div class="card text-center h-100">
        <div class="card-header">{name}</div>
        <div class="card-body">
          <div className="container-gestion">
              <div className="gestion-list-element">
                <div className="gestion-list-element-element label-gestion">Ouvrir le frigo à distance</div>
                <div className="gestion-list-element-element button-gestion"><ButtonFridge label="Ouvrir"/></div>

              </div>
              <div className="gestion-list-element">
                <div className="gestion-list-element-element label-gestion">Bloquer/Débloquer le frigo</div>
                <div className="gestion-list-element-element button-gestion"><ButtonFridge label="Blocage"/></div>
                
                
              </div>
              <div className="gestion-list-element">
                <div className="gestion-list-element-element label-gestion">Redémarrer le frigo</div>
                <div className="gestion-list-element-element button-gestion"><ButtonFridge label="Redémarrer"/></div>

              </div>
              <div className="gestion-list-element">
                <div className="gestion-list-element-element label-gestion">Gérer les médias affiché</div>
                <div className="gestion-list-element-element button-gestion"><ButtonFridge label="Média"/></div>

              </div>
              <div className="gestion-list-element">
                <div className="gestion-list-element-element label-gestion">Forcer la mise à jour</div>
                <div className="gestion-list-element-element button-gestion"><ButtonFridge label="Mise-à-jour"/></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
