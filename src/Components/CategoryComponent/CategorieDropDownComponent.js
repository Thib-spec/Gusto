import React , {useState} from "react";
import "CSS/categories.scss"
import imgcategorie from "Images/imgcategorie.svg"
import fold from "Images/fold.svg"
import unfold from "Images/unfold.svg"
import axios from "axios";
import {Modal, Button} from 'react-bootstrap'
import TextAreaComponent from "../FormComponent/TextAreaComponent";



export default function CategorieDropDownComponent(props){

    //Initialisation des variables
    const[edition,setEdition]=useState(false)
    const [show, setShow] = useState(false);


    //Open and close the modal 
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);

   }


    //Update categorie    

    //when the client update a categorie, 
    function handleUpdateCategorie(){
        try{
            let a=document.getElementById("categoriesEditLabel"+props.categorie.id_category).value
            let b=document.getElementById("categoriesEditDescription"+props.categorie.id_category).value
            axios.put("http://api.gustosolutions.fr/api/category/"+props.categorie.id_category,{
                "label":a,
                "image": "imageurl",
                "description" : b
            
            })
            .then((res) => {
                console.log(res);
                setEdition(false)
                props.func1({
                    "id_category":props.categorie.id_category,
                    "label":a,
                    "image": "imageurl",
                    "description" : b
                
                })
            })
            .catch((err) => {
                console.log(err);
            });
        }
        catch(e){
            console.log(e)
        }
    }



    //Delete categorie

    //when the client delete a categorie and confirm it,
    function handleDeleteCatégorie(){
        try{
            handleClose()
            axios.delete("http://api.gustosolutions.fr/api/category/"+props.categorie.id_category)
            .then((res) => {
                console.log("1",props.categorie)
                props.func(props.categorie)

                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        catch(e){
            console.log(e)
        }
    }



    
    //open and close the dropdown on click
    const [open, setOpen] = useState(false);
    function handleOpen() {
        setOpen(!open);
    }


    return(
        <div className="categories-list-element">
            {open===true?
                <div>
                    {edition?
                    <div>
                        <div className="categories-list-element-title-fold">
                            <div className="categories-title-container"><div className="categories-title-prix-edition"><TextAreaComponent size="small" id={"categoriesEditLabel"+props.categorie.id_category} value={props.categorie.label}/></div></div>
                            <div className="categories-dot" ><img width="100%" src={fold} alt=""/></div>
                        </div>
                        <div className="categories-list-element-sub">
                            <div className="categories-list-element-sub-description">
                                <img src={imgcategorie} alt=""/>
                                <div className=" categories-list-element-sub-description-input"><TextAreaComponent size="large" type="text"  id={"categoriesEditDescription"+props.categorie.id_category} placeholder="Description de la catégorie" value={props.categorie.description}/></div>
                            </div>
                            <div class="categories-list-element-sub-buttons">
                                <button type="button" className="categories-list-element-sub-buttons-element btn btn-info" onClick={()=>handleUpdateCategorie()}>Enregistrer</button>
                                <button type="button" className="categories-list-element-sub-buttons-element btn btn-secondary" onClick={()=>setEdition(false)}>Annuler</button>
                            </div>
                        </div>
                    </div> 
                    :
                    <div>
                        <div className="categories-list-element-title-fold" onClick={() => handleOpen()}>
                            <div>{props.categorie.label}</div>
                            <div className="categories-dot" ><img width="100%" src={fold} alt=""/></div>
                        </div>
                        <div className="categories-list-element-sub">
                            <div className="categories-list-element-sub-description">
                                <img src={imgcategorie} alt=""/>
                                <div className=" categories-list-element-sub-description-input">{props.categorie.description}</div>
                            </div>
                            <div class="categories-list-element-sub-buttons ">
                                
                                <button type="button" className="categories-list-element-sub-buttons-element btn btn-secondary" onClick={()=>setEdition(true)}>Modifier</button>
                                <button type="button" className="categories-list-element-sub-buttons-element btn btn-danger" onClick={()=>handleShow()}>Supprimer</button>
                            </div>
                        </div>
                    </div>
                        
                    }
                    
                </div>
            :
                <div className="categories-list-element-title-unfold" onClick={() => handleOpen()}>
                    <div>{props.categorie.label}</div>
                    <div className="categories-dot" ><img width="100%" src={unfold} alt=""/></div>
                </div>
            }


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Êtes-vous sûr de vouloir supprimer la catégorie : {props.categorie.label} </h4>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Non</Button>
                    <Button variant="primary" onClick={()=>handleDeleteCatégorie()}>Oui</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}