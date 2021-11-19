import React, { Component, useState } from "react";
import Page from "Components/Page";
import { Accordion, Row, Table, Card } from "react-bootstrap";

export default function FrigesProduitCard({}) {
  return (
    <Card
      bg={"primary"}
      // key={1}
      text={"dark"}
      style={{ width: "18rem" }}
      className="mb-2"
    >
      <Card.Header>Produits</Card.Header>
      <Card.Body>
        <Card.Title>Produits</Card.Title>
        <Card.Text>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
