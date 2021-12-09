import "CSS/productPage.scss";
import UploadForm from "Components/FormComponent/UploadForm";
import React, { Component, useState, useEffect } from "react";
import DATAProducts from "Data/products";
import fold from "../Images/fold.svg";
import foldBlack from "../Images/foldBlack.svg";
import imgcategorie from "Images/imgcategorie.svg";
import unfold from "../Images/unfold.svg";
import { Modal, Button } from "react-bootstrap";
import DATACatégories from "Data/categories";
import ProductDropDownComponent from "Components/ProductDropDownComponent";
import axios from "axios";
import CategorieinProductDropDown from "Components/CategorieinProductDropDown";

export default function ProductsPage() {
  const [allCategories, setallCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://api.gustosolutions.fr/api/category")
      .then((res) => {
        setallCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //show the addProduct modal or not
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //hooks value of added products

  //when the client add a product and save it,
  function handleSave() {
    
      let a = document.getElementById("prix").value;
      let b = document.getElementById("label").value;
      let c = document.getElementById("categorie").value;
      c = Number(c);
      a = Number(a);

      axios
        .post("http://api.gustosolutions.fr/api/product", {
          label: b,
          image: "imageurl",
          description: "default description",
          price: a,
          quantity: 1,
          quantity_min: 0,
          quantity_max: 2,
          ubd: "5 jours",
          fk_id_category: c,
        })
        .then((res) => {
          console.log(res);
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    
     
    }

  return (
    <div className="products-container">
      <div className="products-list">
        {allCategories.map((catégorie) => (
          <CategorieinProductDropDown
            categorie={catégorie}
            key={catégorie.id_category}
          />
        ))}

        <button
          type="button"
          className="btn btn-warning products-addProductButton"
          onClick={handleShow}
        >
          Ajouter un produit
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <select
              className="form-select"
              aria-label="Default select example"
              id="categorie"
            >
              <option selected disabled="true">
                Catégories
              </option>
              {allCategories.map((categorie) => (
                <option value={categorie.id_category}>{categorie.label}</option>
              ))}
            </select>
          </div>
          <input
            type="number"
            className="form-control"
            id="prix"
            placeholder="Prix"
          />
          <input
            type="text"
            className="form-control"
            id="label"
            placeholder="Nom du produit"
          />
          <UploadForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
