// import "CSS/colors.css";
import React, { Component, useState } from "react";
import Page from "Components/Page";
import { Accordion, Row, Table, Card } from "react-bootstrap";
import FrigesProduitCard from "Components/FridgesProduitsCard";
import FridgesAccordion from "Components/FridgesAccordion";
import FridgeDropDownComponent from "Components/FridgeDropDownComponent";
import DropDownComponent from "Components/DropDownComponent";

export default function RefrigerateursPage() {
  function handleNothing() {}

  const [produits, setProduits] = useState([
    { id: 0, name: "Banane", quantity: 2, min: 10, max: 10 },
    { id: 1, name: "Kiwi", quantity: 6, min: 3, max: 8 },
    { id: 2, name: "Ananas", quantity: 2, min: 2, max: 4 },
  ]);

  const status = [
    {id:1, message:"En production", inProduction:true},
    {id:2, message:"Hors service", horsService:true},
    {id:3, message:"Livraison en cours", livraison:true},
  ]

  return (
    <>
      <Page>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>

          <FridgesAccordion
            id={2}
            fridgeName="FRIDGE #2"
            fridgeStatus="En production"
          />
          
        </Accordion>
        

        <FridgeDropDownComponent
          title={`fridge1`}
          description="test"
          status={status[2]}
        />
        <FridgeDropDownComponent
          title={`fridge2`}
          description="test"
          status={status[1]}
        />
        <FridgeDropDownComponent
          title={`fridge3`}
          description="test"
          status={status[0]}
        />

        <DropDownComponent
          title={`fridge1`}
          description="test"
          status={status[0]}
        />
      </Page>
    </>
  );
}
