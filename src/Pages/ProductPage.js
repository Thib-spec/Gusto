import "CSS/productPage.scss"
import UploadForm from "Components/FormComponent/UploadForm"
import React, { Component, useState }  from 'react'
import DATAProducts from "Data/products"
import fold from "../Images/fold.svg"
import imgcategorie from "Images/imgcategorie.svg"
import unfold from "../Images/unfold.svg"
import {Modal, Button} from 'react-bootstrap'
import DATACatégories from "Data/categories"


export default function ProductsPage(){

    
    //show the addProduct window or not
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    


    //hooks value of added products
    const[prix,setPrix]=useState(0)
    const[categorie,setCategorie]=useState(0)
    const[label,setLabel]=useState("")
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
            setPrix(a)
            setCategorie(c)
            setLabel(b)
            handleClose()
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


    const[open,setOpen]= useState(initTab);//contain an array of boolean value that define if the product window is open 
    //open and close the window on click
    function handleClick(id){
        if (open[id]===false){
            open[id]=true
        }
        else{
            open[id]=false
        }
        setOpen([...open])
    }


    return(
        <div className="products-container">
            <div className="products-list">
                {DATACatégories.map((catégorie) => (
                    <div>
                        {catégorie.name}
                        {DATAProducts.map((product) => (
                            product.categorie==catégorie.id?
                                <div className="products-list-element">
                                    {open[product.id-1]===true?
                                        <div>
                                            <div className="products-list-element-title-fold" onClick={()=>handleClick(product.id-1)}>
                                                <div>{product.name}</div>
                                                <div className="products-fold"><img width="100%" src={fold} alt=""/></div>
                                            </div>
                                            <div className="products-list-element-sub">
                                                <div className="products-list-element-sub-description">
                                                    <img src={imgcategorie} alt=""/>
                                                    <textarea type="text" className=" products-list-element-sub-description-input"  placeholder="Description du produit" value={product.description}/>
                                                </div>
                                                <div class="products-list-element-sub-buttons ">
                                                    <button type="button" className="products-list-element-sub-buttons-element btn btn-info">Enregistrer</button>
                                                    <button type="button" className="products-list-element-sub-buttons-element btn btn-danger">Supprimer</button>
                                                </div>
                                            </div>
                                        </div>   
                                    :
                                        <div className="products-list-element-title-unfold" onClick={()=>handleClick(product.id-1)}>
                                            <div>{product.name}</div>
                                            <div className="products-fold" ><img width="100%" src={unfold} alt=""/></div>
                                        </div>
                                    }
                                </div>
                            :false
                        ))}
                    </div> 
                ))}
                <div>add product nom : {label} prix : {prix} catégorie : {categorie}</div>
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
                            <option value="1">Fruit</option>
                            <option value="2">Legumes</option>
                            <option value="3">dessert</option>
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