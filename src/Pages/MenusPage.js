import "CSS/categories.scss"
import DATACatégories from "../Data/categories"

import {Modal, Button} from 'react-bootstrap'
import UploadForm from "Components/FormComponent/UploadForm"
import React, { useState, useEffect }  from 'react'
import axios from "axios";
import MenuDropDownComponent from "Components/MenuComponent/MenuDropDownComponent"


export default function MenusPage(){



    const [allMenus, setallMenus] = useState([]);
    useEffect(() => {
        axios.get("http://api.gustosolutions.fr/api/menu")
            .then((res) =>{setallMenus(res.data)
            })
            .catch((err) => console.log(err));
    }, [])

    function handleAddMenu(){
        axios.post("http://api.gustosolutions.fr/api/menu", {
            "web_label": "TestwebLabel",
            "fridge_label": "TestfridgeLabel",
            "image": "",
            "price": "789",
            "fk_id_client": 1
          })
            .then((res) => {
                console.log(res);
                window.location.reload(false);

            })
            .catch((err) => {
                console.log(err);
            });

    }



  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    
    
   
   
    
    return(
        <div className="categories-container">
            <div className="categories-list">
                {allMenus.map((menu) => (
                <div>
                    <div>{console.log(menu)}</div>
                    <MenuDropDownComponent menu={menu}/>
                    
                </div>
                    
                ))}
                
                <button type="button" class="btn btn-warning categories-list-element-sub-buttons-element-addButton" onClick={handleShow}>Ajouter un menu</button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un menu</Modal.Title>
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
                    <Button variant="primary" >Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
                
}   


