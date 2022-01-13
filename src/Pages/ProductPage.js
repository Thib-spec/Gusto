import "CSS/productPage.scss"
import UploadForm from "Components/FormComponent/UploadForm"
import React, { useState, useEffect }  from 'react'
import {Modal, Button} from 'react-bootstrap'
import axios from "axios";
import ProductDropDownCategorie from "Components/ProductComponent/ProductDropDownCategorie"
import UploadContainer from "Components/GestionPhoto/UploadContainer";


export default function ProductsPage(){

    //On récupère la liste des catégories 
    const [allCategories, setallCategories] = useState([]);
    useEffect(() => {
        axios.get("http://api.gustosolutions.fr/api/category")
            .then((res) =>{setallCategories(res.data)
            })
            .catch((err) => console.log(err));
    }, [])


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
            d=Number(d)
            
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

            handleClose()
        }
        catch(e){
            console.log(e)
        }
     }

    

    return(
        <div className="products-container">
            <div className="products-list">
                <button type="button" class="btn btn-warning products-addProductButton" onClick={handleShow}>Ajouter un produit</button>
                {/*On map les catégories et pour chaque catégorie on affiche ProductDropDownCategorie*/}
                {allCategories.map((catégorie) => (
                    <ProductDropDownCategorie categorie={catégorie} key={catégorie.id_category}/>
                ))}
                
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

                    <UploadContainer/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={()=>handleSave()}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}