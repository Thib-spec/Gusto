import "CSS/categories.scss";
import DATACatégories from "../Data/categories";

import { Modal, Button } from "react-bootstrap";
import UploadForm from "Components/FormComponent/UploadForm";
import React, { useState, useEffect } from "react";
import CategorieDropDownComponent from "Components/CategorieDropDownComponent";
import axios from "axios";

export default function CategoriesPage() {
  const [allCategories, setallCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://api.gustosolutions.fr/api/category")
      .then((res) => {
        setallCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //Add catégorie

  //show the addProduct modal or not
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //hook value of added categorie
  const [catégorieAdd, setCategorieAdd] = useState("");
  //when the client add a categorie and save it,
  function handleAddCatégorie() {
    let token = localStorage.getItem("authToken");
    console.log("TOKEN : ", token);
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      let a = document.getElementById("labelCatégorie").value;
      let b = document.getElementById("descriptionCategorie").value;

      axios
        .post(
          "http://api.gustosolutions.fr/api/category",
          {
            label: a,
            image: "imageurl",
            description: b,
          },
          config
        )
        .then((res) => {
          console.log(res);
          // setallCategories([...allCategories, res])
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });

      handleClose();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="categories-container">
      <div className="categories-list">
        {allCategories.map((categorie) => (
          <CategorieDropDownComponent
            categorie={categorie}
            key={categorie.id_category}
          />
        ))}

        <button
          type="button"
          class="btn btn-warning categories-list-element-sub-buttons-element-addButton"
          onClick={handleShow}
        >
          Ajouter une catégorie
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="addProduct-container">
            <div className="addProduct-container-form">
              <input
                type="text"
                class="form-control"
                id="labelCatégorie"
                placeholder="Nom de la catégorie"
              />
              <textarea
                type="text"
                className="form-control textAreaResize"
                id="descriptionCategorie"
                placeholder="Description"
              ></textarea>
              <UploadForm />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAddCatégorie()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
