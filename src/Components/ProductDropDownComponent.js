import "../CSS/productPage.scss"
import React, {useState} from "react"
import fold from "../Images/fold.svg"
import imgcategorie from "Images/imgcategorie.svg"
import unfold from "../Images/unfold.svg"
import axios from "axios";
import {Modal, Button} from 'react-bootstrap'
import TextAreaComponent from "./FormComponent/TextAreaComponent"



export default function ProductDropDownComponent(props){
    const[edition,setEdition]=useState(false)

    const [open, setOpen] = useState(false);
    function handleOpen() {
        setOpen(!open);
    }

     //show the addProduct modal or not
     const [show, setShow] = useState(false);
     const [nameProduitDel, setnameProduitDel] = useState("");

     const handleClose = () => setShow(false);

     const handleShow = () => {
         setShow(true);
         setnameProduitDel(props.product.label)

    }


    function handleUpdateProduct(){
        try{
            let a=document.getElementById("productEditLabel"+props.product.id_product).value
            let b=document.getElementById("productEditUbd"+props.product.id_product).value
            b=Number(b)
            if (b<0){
                b=0
            }
            let c=document.getElementById("productEditPrice"+props.product.id_product).value
            let d=document.getElementById("productEditDescription"+props.product.id_product).value
            axios.put("http://api.gustosolutions.fr/api/product/"+props.product.id_product,{
                "label": a,
                "price": c*100,
                "ubd": b,
                "description": d,
              })
            .then((res) => {
                console.log(res);
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        catch(e){
            console.log(e)
        }
    }



    function handleDeleteProduct(){
        try{
            axios.delete("http://api.gustosolutions.fr/api/product/"+props.product.id_product)
            .then((res) => {
                console.log(res);
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        catch(e){
            console.log(e)
        }
    }
    
    function realPrice(prix){
        return(prix/100)
        
    }

    return(
        <div className="products-list-element">
            {open?
                <div>
                    {
                        edition?
                            <div>
                                <div className="products-list-element-title-fold">
                                   <div className="product-title-container"><div className="product-title-prix-align-edition"><TextAreaComponent type="text" value={props.product.label} size="small" id={"productEditLabel"+props.product.id_product} placeholder="Nom du produit"/></div></div>
                                    <div className="product-title-container"><div className="product-title-prix-align-edition"><TextAreaComponent type="number" size="small" value={props.product.ubd} id={"productEditUbd"+props.product.id_product} placeholder="Date de péremption"/></div></div>
                                    <div className="product-title-container"><div className="product-title-prix-align-edition"><TextAreaComponent type="number" id={"productEditPrice"+props.product.id_product} value={realPrice(props.product.price)} placeholder="Prix" size="small" step="0.01" /></div></div>
                                    
                                    <div className="products-fold"><img width="100%" src={fold} alt=""/></div>
                                    
                                </div>
                                <div className="products-list-element-sub">
                                    <div className="products-list-element-sub-description">
                                        <img src={imgcategorie} alt=""/>
                                        <div className=" products-list-element-sub-description-input">
                                            <TextAreaComponent size="large" type="text" value={props.product.description} id={"productEditDescription"+props.product.id_product} placeholder="Description du produit"/>
                                        </div>
                                    </div>
                                    <div class="products-list-element-sub-buttons ">
                                        <button type="button" className="products-list-element-sub-buttons-element btn btn-info" onClick={()=>handleUpdateProduct()}>Enregistrer</button>
                                        <button type="button" className="products-list-element-sub-buttons-element btn btn-secondary" onClick={()=>setEdition(false)}>Annuler</button>

                                    </div>
                                </div>

                            </div>
                        :
                            <div>
                                <div className="products-list-element-title-fold" onClick={()=>handleOpen()}>
                                    <div className="product-title-name">{props.product.label}</div>
                                    {/* {ubdSelected?<div className="product-title-dlc" onMouseEnter={()=>setubdSelected(!ubdSelected)} onMouseLeave={()=>setubdSelected(!ubdSelected)}>{props.product.ubd}1</div>:<div className="product-title-dlc" onMouseOver={()=>setubdSelected(!ubdSelected)} onMouseLeave={()=>setubdSelected(!ubdSelected)}>{props.product.ubd}2</div>} */}
                                    <div className="product-title-dlc">{props.product.ubd} jours</div>
                                    <div className="product-title-prix"><div className="product-title-prix-align">{realPrice(props.product.price).toFixed(2)+" €"}</div></div>
                                    <div className="products-fold"><img width="100%" src={fold} alt=""/></div>
                                </div>
                                <div className="products-list-element-sub">
                                    <div className="products-list-element-sub-description">
                                        <img src={imgcategorie} alt=""/>
                                        <div className=" products-list-element-sub-description-input" >{props.product.description}</div>
                                    </div>
                                    <div class="products-list-element-sub-buttons ">
                                          
                                        <button type="button" className="products-list-element-sub-buttons-element btn btn-secondary" onClick={()=>setEdition(true)}>Modifier</button>
                                        <button type="button" className="products-list-element-sub-buttons-element btn btn-danger" onClick={()=>handleShow()}>Supprimer</button>

                                    </div>
                                </div>

                            </div>
                    }
                    
                </div>   
            :
                <div className="products-list-element-title-unfold" onClick={()=>handleOpen()} on>
                    <div className="product-title-name">{props.product.label}</div>
                    <div className="product-title-dlc" >{props.product.ubd} jours</div>
                    <div className="product-title-prix"><div className="product-title-prix-align">{realPrice(props.product.price).toFixed(2)+" €"}</div></div>
                    <div className="products-fold"><img width="100%" src={unfold} alt=""/></div>
                </div>
            }



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Êtes-vous sûr de vouloir supprimer le produit : {nameProduitDel} </h4>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Non</Button>
                    <Button variant="primary" onClick={()=>handleDeleteProduct()}>Oui</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}