import "CSS/categories.scss"

import {Modal, Button} from 'react-bootstrap'
import React, { useState, useEffect }  from 'react'
import axios from "axios";
import MenuDropDownComponent from "Components/MenuComponent/MenuDropDownComponent"
import UploadContainer from "Components/GestionPhoto/UploadContainer";


export default function MenusPage(props){


    //props.func(true);


    //On récupère tout les menus 
    const [allMenus, setallMenus] = useState([]);
    useEffect(() => {
        let token = localStorage.getItem("authToken") //on récupère le token de l'utilisateur
        let config = {
            headers: {
              "Authorization": "Bearer "+token,
            }
          }
        axios.get("http://api.gustosolutions.fr/api/menu/user",config)
            .then((res) =>{setallMenus(res.data)
            })
            .catch((err) => console.log(err));
    }, [])
    console.log(allMenus)



    //fonction permettant l'ajout de menus
    function handleAddMenu(){
        
        //On récupère les valeurs écrite dans le form (modal)
        let a=document.getElementById("fridgeLabelMenu").value
        let b=document.getElementById("webLabelMenu").value
        let c=document.getElementById("priceMenu").value
        
        c=Number(c)
        
        let token = localStorage.getItem("authToken")//on récupère le token de l'utilisateur
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
                setallMenus([...allMenus,res.data])//On met à jour la liste des menus
            })
            .catch((err) => {
                console.log(err);
            });

    }

    //permet l'affichage des modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //Permet de mettre à jour la liste des menus lors d'une suppression 
    const refreshDelMenu = (data)=>{
        const menuAfterDelete= new Array()
        allMenus.map((el)=>
            data!=el.id_menu?menuAfterDelete.push(el):false
            )
        setallMenus(menuAfterDelete)
    }

    

   
    
    return(
        <div className="categories-container">
            <div className="categories-list">
                <button type="button" class="btn btn-warning categories-list-element-sub-buttons-element-addButton" onClick={handleShow}>Ajouter un menu</button>
                {allMenus.map((menu) => (
                    <div>
                        {/*Pour chaque menus : */}
                        <MenuDropDownComponent menu={menu} funcDelMenu={refreshDelMenu}/>
                    </div>    
                ))}
            </div>


            {/*Modal permettant à l'utilisateur de remplir un formulaire pour l'ajout d'un produit*/}
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
                            <UploadContainer/>
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


