import "CSS/categories.scss"
import DATACatégories from "../Data/categories"

import {Modal, Button} from 'react-bootstrap'
import UploadForm from "Components/FormComponent/UploadForm"
import React, { useState, useEffect }  from 'react'
import axios from "axios";
import MenuDropDownComponent2 from "Components/MenuComponent/MenuDropDownComponent2"


export default function MenusPage(){



    const [allMenus, setallMenus] = useState([]);
    useEffect(() => {
        axios.get("http://api.gustosolutions.fr/api/menu")
            .then((res) =>{setallMenus(res.data)
            })
            .catch((err) => console.log(err));
    }, [])
    console.log(allMenus)
    function handleAddMenu(){
        let a=document.getElementById("fridgeLabelMenu").value
        let b=document.getElementById("webLabelMenu").value
        let c=document.getElementById("priceMenu").value
        
        c=Number(c)
        console.log(a,typeof(a))
        console.log(b,typeof(b))
        console.log(c,typeof(c))
        let token = localStorage.getItem("authToken")
        let config = {
            headers: {
              "Authorization": "Bearer "+token,
            }
          }

        axios.post("http://api.gustosolutions.fr/api/menu", {
            "web_label": b,
            "fridge_label": a,
            "image": "image",
            "price": c*100,
          },config)

            .then((res) => {
                console.log(res);
                setallMenus([...allMenus,res.data])
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
                    <MenuDropDownComponent2 menu={menu}/>
                    
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
                            <input type="text" class="form-control" id="webLabelMenu" placeholder="Nom du menu web"/>
                            <input type="text" class="form-control" id="fridgeLabelMenu" placeholder="Nom du menu frigo"/>
                            <input type="number" class="form-control" id="priceMenu" placeholder="Prix du menu"/>

                            <UploadForm/>
                        </div>
                    </div> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={()=>handleAddMenu()}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
                
}   


