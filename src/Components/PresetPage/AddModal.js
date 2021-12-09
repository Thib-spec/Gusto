import React, { Component, useState } from "react";
import Page from "Components/Page";
import { Accordion, Row, Table, Card, Modal, Button } from "react-bootstrap";

export default function FridgeAddModal({ show, onHide, title, children }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="mymodal"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
