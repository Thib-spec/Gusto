import "CSS/categories.scss"
import DATACatégories from "../Data/categories"
import DATAProducts from "../Data/products"
import dot from "Images/dots.png"
import InputForm from "Components/FormComponent/InputForm"
import imgcategorie from "Images/imgcategorie.svg"
import fold from "../Images/fold.svg"
import unfold from "../Images/unfold.svg"
import {Modal, Button} from 'react-bootstrap'

import UploadForm from "Components/FormComponent/UploadForm"
import SelectForm from "Components/FormComponent/SelectForm"

import React, { Component, useState }  from 'react'


const categorieList =[DATACatégories.map((categories)=>categories.name)] 
const inittab=[]
for (let step = 0; step < categorieList[0].length; step++) {
    inittab[step]=false
}

export default function CategoriesPage(){
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const[click,setClicked]= useState(inittab);
  


    function handleClick(id){
        if (click[id]===false){
            click[id]=true
        }
        else{
            click[id]=false
        }
        setClicked([...click])
   }

    return(
        <div className="categories-container">
            <div className="categories-list">
                {DATACatégories.map((categories) => (
                <div className="categories-list-element">
                    
                    {click[categories.id-1]===true?
                        <div className="categories-list-element-title-fold" onClick={()=>handleClick(categories.id-1)}>
                            <div>{categories.name}</div>
                            <div className="categories-dot" ><img width="100%" src={fold} alt=""/></div>
                        </div>
                        :
                        <div className="categories-list-element-title-unfold" onClick={()=>handleClick(categories.id-1)}>
                            <div>{categories.name}</div>
                            <div className="categories-dot" ><img width="100%" src={unfold} alt=""/></div>
                        </div>
                        
                        }
                       
                    {
                      click[categories.id-1]===true?
                            
                            <div className="categories-list-element-sub">
                                <div className="categories-list-element-sub-description">
                                    <img src={imgcategorie} alt=""/>
                                    <textarea type="text" className=" categories-list-element-sub-description-input"  placeholder="Description de la catégorie" value={categories.description}/>
                                    
                                </div>
                                <div class="categories-list-element-sub-buttons ">
                                    <button type="button" className="categories-list-element-sub-buttons-element btn btn-info">Enregistrer</button>
                                    <button type="button" className="categories-list-element-sub-buttons-element btn btn-danger">Supprimer</button>
                                </div>
                            </div>
                            
                        :false
                        } 

                    
                    
                    
                </div>
                ))}
                
                <button type="button" class="btn btn-warning categories-list-element-sub-buttons-element-addButton" onClick={handleShow}>Ajouter une catégorie</button>
            </div>

            




            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Ajouter un produit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="addProduct-container">
                
                <div className="addProduct-container-form">
                    <div className="addProduct-container-form-categories">
                        <SelectForm className="" one="Fruit" two="Boisson" three="dessert"/>
                    </div> 
                    <InputForm label="Prix" type="number"/>
                    <InputForm label="Nom du produit" type="text"/>
                    <UploadForm/>
                </div>
            </div> 
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>



        {/* {DATAProducts.map((product)=>(
                            <div className="categories-list-element-sub-element">
                                {product.categorie===categories.id?<div>{product.name}</div>:false}<div></div>
                            </div>
                        ))} */}  
                        
        {/* <div className="categories-dot-menu-element">Modifier</div>
                                <div className="categories-dot-menu-element">Supprimer</div>  */}
            
        </div>
    // <div className="">
    //     {DATACatégories.map((categories) => (
    //     <div className="">{categories.name}</div>))}
    // </div>
    )
}   

