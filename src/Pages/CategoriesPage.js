import "CSS/categories.scss"
import DATACatégories from "../Data/categories"

import {Modal, Button} from 'react-bootstrap'
import UploadForm from "Components/FormComponent/UploadForm"
import React, { useState, useEffect }  from 'react'
import CategorieDropDownComponent from "Components/CategorieDropDownComponent"
import axios from "axios";

export default function CategoriesPage(){





    const [allCategories, setallCategories] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/api/category")
            .then((res) =>{setallCategories(res.data)
            })
            .catch((err) => console.log(err));
    }, [])

  



    //Add catégorie

    //show the addProduct modal or not
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //hook value of added categorie
    const[catégorieAdd,setCategorieAdd]=useState("")
    //when the client add a categorie and save it,
    function handleAddCatégorie(){
        try{
            let a=document.getElementById('labelCatégorie').value
            setCategorieAdd(a)
            axios.post("http://localhost:3001/api/category", {
                "label":a,
                "image": "imageurl",
                "description" : "description"
            
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
        <div className="categories-container">
            <div className="categories-list">
                {allCategories.map((categorie) => (
                    
                    <CategorieDropDownComponent categorie={categorie} key={categorie.id_category}/>
                ))}
                <div>add categorie nom : {catégorieAdd} </div>
                <div>delete categorie id : {}</div>
                <div>update categorie id :{} description :{}</div>
                <button type="button" class="btn btn-warning categories-list-element-sub-buttons-element-addButton" onClick={handleShow}>Ajouter une catégorie</button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une catégorie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="addProduct-container">
                        <div className="addProduct-container-form">
                            <input type="text" class="form-control" id="labelCatégorie" placeholder="Nom de la catégorie"/>
                            <UploadForm/>
                        </div>
                    </div> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={()=>handleAddCatégorie()}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
                
}   

