import React, { Component, useState } from "react";
import Page from "Components/Page";
import { Accordion, Row, Table, Card } from "react-bootstrap";


export default function FrigesProduitCard({ }) {
  return (
      <Card
        bg={"primary"}
        // key={1}
        text={"dark"}
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Card Title </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
  );
}
