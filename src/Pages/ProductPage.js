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
  function handleSave(){
    try{
        let a=document.getElementById('prix').value
        let b=document.getElementById('label').value
        let c=document.getElementById("categorie").value
        let d=document.getElementById("ubd").value
        let e=document.getElementById("description").value
        c=Number(c)
        a=Number(a)
        
        axios.post("http://api.gustosolutions.fr/api/product",{
            "label":b,
            "image": "imageurl",
            "description" : e,
            "price":a*100,
            "ubd":d,
            "fk_id_category":c
        })
        .then((res) => {
            console.log(res);
            window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    catch(e){
        console.log(err);
        }
    }
    
     
     

  


    return(
        <div className="products-container">
            <div className="products-list">
                {allCategories.map((catégorie) => (
                    <CategorieinProductDropDown categorie={catégorie} key={catégorie.id_category}/>
                ))}
                
                <button type="button" class="btn btn-warning products-addProductButton" onClick={handleShow}>Ajouter un produit</button>
            </div>
        
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        <select class="form-select" aria-label="Default select example" id ="categorie">
                            <option selected disabled="true">Catégories</option>
                            {allCategories.map((categorie) => (<option value={categorie.id_category}>{categorie.label}</option>))}
                            
                        </select>
                    </div> 
                    <input type="text" class="form-control" id="label" placeholder="Nom du produit"/>
                    <input type="number" class="form-control" id="prix" placeholder="Prix" />
                    <input type="text" class="form-control" id="ubd" placeholder="Date de péremption" />
                    <textarea type="text" className="form-control textAreaResize" id="description" placeholder="Description"></textarea>

                    <UploadForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={()=>handleSave()}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}