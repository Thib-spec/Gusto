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
import React, { Component, useState }  from 'react'


export default function CategoriesPage(){
    
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
            handleClose()
        }
        catch(e){
            console.log(e)
        }
    }
    
    //Delete categorie

    //hook value of deleted categorie
    const[categorieDel,setCategorieDel]=useState(0)
    //when the client delete a categorie and confirm it, 
    function handleDeleteCatégorie(id){
        try{
            setCategorieDel(id)
        }
        catch(e){
            console.log(e)
        }
    }

    //Update categorie

    //hooks value of updated categories
    const[idUpdate,setidUpdate]=useState(0)
    const[descriptionUpdate,setDescriptionUpdate]=useState("")    

    //when the client update a categorie and confirm it, 
    function handleUpdateCategorie(id){
        try{
            let a = document.getElementById('descriptionCategorie'+id).value
            setDescriptionUpdate(a)
            setidUpdate(id)
        }
        catch(e){
            console.log(e)
        }
    }

    //Dropdown categorie

    //initialise initTab as an array of false values (initTab.length = categorieList.length)
    const categorieList =[DATACatégories.map((categories)=>categories.name)] 
    console.log("data",categorieList)

    const initTab = [];
    
    categorieList[0].map((el)=>initTab.push([false]))

    console.log(initTab,typeof(initTab))
    const[clicked,setClicked]= useState(initTab);//contain an array of boolean value that define if the categorie dropdown is open 
    console.log("testclick : " ,clicked)
    
    //open and close the dropdown on click
    function handleClick(id){
        if (clicked[id]===false){
            clicked[id]=true
        }
        else{
            clicked[id]=false
        }
        setClicked([...clicked])
    }

    return(
        <div className="categories-container">
            <div className="categories-list">
                {DATACatégories.map((categories) => (
                    <div className="categories-list-element">
                        {clicked[categories.id-1]===true?
                            <div>
                                <div className="categories-list-element-title-fold" onClick={()=>handleClick(categories.id-1)}>
                                    <div>{categories.name}</div>
                                    <div className="categories-dot" ><img width="100%" src={fold} alt=""/></div>
                                </div>
                                <div className="categories-list-element-sub">
                                    <div className="categories-list-element-sub-description">
                                        <img src={imgcategorie} alt=""/>
                                        <textarea type="text" className=" categories-list-element-sub-description-input" id={"descriptionCategorie"+categories.id} placeholder="Description de la catégorie">{categories.description}</textarea>
                                    </div>
                                    <div class="categories-list-element-sub-buttons ">
                                        <button type="button" className="categories-list-element-sub-buttons-element btn btn-info" onClick={()=>handleUpdateCategorie(categories.id)}>Enregistrer</button>
                                        <button type="button" className="categories-list-element-sub-buttons-element btn btn-danger" onClick={()=>handleDeleteCatégorie(categories.id)}>Supprimer</button>
                                    </div>
                                </div>
                            </div> 
                        :
                            <div className="categories-list-element-title-unfold" onClick={()=>handleClick(categories.id-1)}>
                                <div>{categories.name}</div>
                                <div className="categories-dot" ><img width="100%" src={unfold} alt=""/></div>
                            </div>
                        }
                    </div>
                ))}
                <div>add categorie nom : {catégorieAdd} </div>
                <div>delete categorie id : {categorieDel}</div>
                <div>update categorie id :{idUpdate} description :{descriptionUpdate}</div>
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

