import "CSS/productPage.scss"
import UploadForm from "Components/FormComponent/UploadForm"
import React, { Component, useState }  from 'react'
import DATAProducts from "Data/products"
import fold from "../Images/fold.svg"
import foldBlack from "../Images/foldBlack.svg"
import imgcategorie from "Images/imgcategorie.svg"
import unfold from "../Images/unfold.svg"
import {Modal, Button} from 'react-bootstrap'
import DATACatégories from "Data/categories"
import { computeHeadingLevel } from "@testing-library/dom"


export default function ProductsPage(){

    //Add product

    //show the addProduct modal or not
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //hooks value of added products
    const[prixadd,setPrixAdd]=useState(0)
    const[categorieadd,setCategorieAdd]=useState(0)
    const[labeladd,setLabelAdd]=useState("")
    //when the client add a product and save it, 
    function handleSave(){
        try{
            let a=document.getElementById('prix').value
            let b=document.getElementById('label').value
            let c=document.getElementById("categorie").value
            console.log(typeof c)
            if (c=="Catégories"){
                c=0
            }
            setPrixAdd(a)
            setCategorieAdd(c)
            setLabelAdd(b)
            handleClose()
        }
        catch(e){
            console.log(e)
        }
    }

    //Delete product

    //hook value of deleted products
    const[idDel,setIdDel]=useState(0)    
    //when the client delete a product and confirm it, 
    function handleDelete(id){
        try{
            setIdDel(id)
        }
        catch(e){
            console.log(e)
        }
    }
    
    //Update product

    //hooks value of updated products
    const[idUpdate,setidUpdate]=useState(0)
    const[descriptionUpdate,setDescriptionUpdate]=useState("")    

    //when the client update a product and confirm it, 
    function handleUpdate(id){
        try{
            let a = document.getElementById('descriptionProduct'+id).value
            setDescriptionUpdate(a)
            setidUpdate(id)
        }
        catch(e){
            console.log(e)
        }
    }


    //Dropdown product

    //initialise initTab as an array of false values (initTab.length = productList.length)
    const productList =[DATAProducts.map((product)=>product.name)] 
    const initTab=[]
    for (let step = 0; step < productList[0].length; step++) {
        initTab[step]=false
    }

    const[open,setOpen]= useState(initTab);//contain an array of boolean value that define if the product dropdown is open 
    //open and close the dropdown on click
    function handleClick(id){
        if (open[id]===false){
            open[id]=true
        }
        else{
            open[id]=false
        }
        setOpen([...open])
    }

  

    //Dropdown categorie

    //initialise initTab2 as an array of true values for categories(initTab2.length = categorieList.length)
    const categorieList =[DATACatégories.map((categorie)=>categorie.name)] 
    const initTab2=[]
    for (let step = 0; step < categorieList[0].length; step++) {
        initTab2[step]=true
    }

    const[open2,setOpen2]= useState(initTab2);//contain an array of boolean value that define if the product dropdown is open 
    //open and close the dropdown on click
    function handleClick2(id){
        console.log(open2)
        if (open2[id]===false){
            open2[id]=true
        }
        else{
            open2[id]=false
        }
        setOpen2([...open2])
    }
    

    return(
        <div className="products-container">
            <div className="products-list">
                {DATACatégories.map((catégorie) => (
                    <div>
                        <div className="products-categories-dropdownElement" onClick={()=>handleClick2(catégorie.id-1)}>
                            <div className="products-fold">{open2[catégorie.id-1]?<img className="rotate45" width="100%" src={foldBlack} alt=""/>:<img className="rotate90" width="100%" src={foldBlack} alt=""/>}</div>
                            <div className="products-categories-dropdownElement-name" >{catégorie.name}</div>
                        </div>
                        {open2[catégorie.id-1]?
                            <div>
                            {DATAProducts.map((product) => (
                                product.categorie==catégorie.id?
                                    <div className="products-list-element">
                                        {open[product.id-1]===true?
                                            <div>
                                                <div className="products-list-element-title-fold" onClick={()=>handleClick(product.id-1)}>
                                                    <div className="product-title-name">{product.name}</div>
                                                    <div className="product-title-dlc">{product.dlc}</div>
                                                    <div className="product-title-prix"><div className="product-title-prix-align">{product.prix}</div></div>
                                                    <div className="products-fold"><img width="100%" src={fold} alt=""/></div>
                                                </div>
                                                <div className="products-list-element-sub">
                                                    <div className="products-list-element-sub-description">
                                                        <img src={imgcategorie} alt=""/>
                                                        <textarea type="text" className=" products-list-element-sub-description-input"  id={"descriptionProduct"+product.id} placeholder="Description du produit">{product.description}</textarea>
                                                    </div>
                                                    <div class="products-list-element-sub-buttons ">
                                                        <button type="button" className="products-list-element-sub-buttons-element btn btn-info" onClick={()=>handleUpdate(product.id)}>Enregistrer</button>
                                                        <button type="button" className="products-list-element-sub-buttons-element btn btn-danger" onClick={()=>handleDelete(product.id)}>Supprimer</button>
                                                    </div>
                                                </div>
                                            </div>   
                                        :
                                            <div className="products-list-element-title-unfold" onClick={()=>handleClick(product.id-1)}>
                                                <div className="product-title-name">{product.name}</div>
                                                <div className="product-title-dlc">{product.dlc}</div>
                                                <div className="product-title-prix"><div className="product-title-prix-align">{product.prix}</div></div>
                                                <div className="products-fold"><img width="100%" src={unfold} alt=""/></div>
                                            </div>
                                        }
                                    </div>
                                :false
                            ))}
                            </div>
                        :false
                        }
                    </div> 
                ))}
                <div>add product nom : {labeladd} prix : {prixadd} catégorie : {categorieadd}</div>
                <div>delete product id : {idDel}</div>
                <div>update product id : {idUpdate} description : {descriptionUpdate} </div>
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
                            {DATACatégories.map((catégorie) => (<option value={catégorie.id}>{catégorie.name}</option>))}
                            
                        </select>
                    </div> 
                    <input type="number" class="form-control" id="prix" placeholder="Prix" />
                    <input type="text" class="form-control" id="label" placeholder="Nom du produit"/>
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