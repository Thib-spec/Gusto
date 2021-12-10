import React, { useState } from "react";
import { Accordion, Row, Table, Card, Modal, Button } from "react-bootstrap";

function CreatePresetButton({}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [presetName, setPresetName] = useState("");

  const handleChangePresetName = (event) => {
    setPresetName(event.target.value);
  };

  const handleSavePreset = () => {};

  return (
    <>
      <button type="button" class="col-6 btn btn-warning" onClick={handleShow}>
        Ajouter un Preset
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>create a preset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <div className="">
                <label>Nom du preset</label>
                <input
                  type="text"
                  class="form-control"
                  id="labelPreset"
                  placeholder="Nom du Preset"
                  onChange={handleChangePresetName}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSavePreset}>
            Create Preset
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreatePresetButton;
