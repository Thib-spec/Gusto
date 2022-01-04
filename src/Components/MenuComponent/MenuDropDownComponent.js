import React ,{useState,useEffect} from "react";
import axios from "axios"
import fold from "../../Images/fold.svg"
import unfold from "../../Images/unfold.svg"
import "../../CSS/menuPage.scss"

import {Modal, Button} from 'react-bootstrap'
import ProductElement from "./ProductElement";



export default function MenuDropDownComponent2(props){

    const nameMenuDel = props.menu.web_label;//on récupère le nom du menu

    const[edition,setEdition]=useState(false)

    //Initialisation des modal d'ajout et de suppression de produits dans un menu  
    const [showDel, setShowDel] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const handleCloseDel = () => setShowDel(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowDel = () => {
        setShowDel(true);
   }
   const handleShowAdd = () => {setShowAdd(true)}
   
    const [open, setOpen] = useState(false);
    function handleOpen() {
        setOpen(!open);
    }


    //On récupère la liste des produits du menu  
    const [allProductsInMenu, setallProductsInMenu] = useState([]);
    useEffect(() => {
        
        axios.get("http://api.gustosolutions.fr/api/menu/"+props.menu.id_menu+"/product")
            .then((res) =>{setallProductsInMenu(res.data)})
            
            .catch((err) => console.log(err));
    }, [])


    //Fonction permettant de supprimer un menu
    function handleDeleteMenu(){
        axios.delete("http://api.gustosolutions.fr/api/menu/"+props.menu.id_menu)
        .then((res) => {
            console.log(res);
            props.funcDelMenu(props.menu.id_menu)
        })
        .catch((err) => {
            console.log(err);
       });
    }

    function realPrice(prix){
        return(prix/100)
    }

    //Fonction permettant d'ajouter un produit dans 
    const [allProduct, setallProduct] = useState([]);
    function handleAddProduct(){
        let token = localStorage.getItem("authToken") //on récupère le token de l'utilisateur
        let config = {
            headers: {
              "Authorization": "Bearer "+token,
            }
          }
        axios.get("http://api.gustosolutions.fr/api/product/user",config)
            .then((res) =>{setallProduct(res.data)
            })
            .catch((err) => console.log(err));

        handleShowAdd(true)
    }
    

    //On actualise la liste des produits dans un menu lors d'une modification
    const refreshAdd = (data) => {
        setallProductsInMenu([...allProductsInMenu,data])
      }
    
    const refreshDel = (data) => {
    const array2= new Array()
    allProductsInMenu.map((el)=>
        data.id_product!=el.id_product?array2.push(el):false
    )
    setallProductsInMenu(array2)
    }


    return(
        <div className="menu-list-element">
            {/*dropdown ouvert ?*/}
            {open===true?
                <div>
                    <div className="menu-list-element-title-fold" onClick={() => handleOpen()}>
                        <div>{props.menu.web_label}</div>
                        <div>{props.menu.fridge_label}</div>
                        <div>{realPrice(props.menu.price).toFixed(2)+" €"}</div>
                        <div className="menu-dot" ><img width="100%" src={fold} alt=""/></div>
                    </div>
                    <div className="menu-list-element-sub">
                        <div className="menu-list-element-sub-description">
                            <div>
                                {allProductsInMenu.map((product)=>
                                    <ProductElement func={refreshDel} edition={edition} fonction="Delete" product={product} menu={props.menu}/>
                                    )
                                }
                            </div>
                        </div>
                        <div className="menu-container-button-addProduct">
                            {
                                edition?
                                    <div className="menu-button-addProduct" onClick={()=>handleAddProduct()}>Ajouter un produit</div>
                                    :false
                            }
                        </div>
                        <div>
                            {
                                edition?
                                <div class="menu-list-element-sub-buttons ">
                                    <button type="button" className="menu-list-element-sub-buttons-element btn btn-secondary" onClick={()=>setEdition(false)}>Exit</button>
                            
                                </div>
                                :
                                <div class="menu-list-element-sub-buttons ">
                                    <button type="button" className="menu-list-element-sub-buttons-element btn btn-info" onClick={()=>setEdition(true)}>Modifier</button>
                                    <button type="button" className="menu-list-element-sub-buttons-element btn btn-danger" onClick={()=>handleShowDel()}>Supprimer</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            :
                <div className="menu-list-element-title-unfold" onClick={() => handleOpen()}>
                    <div>{props.menu.fridge_label}</div>
                    <div>{realPrice(props.menu.price).toFixed(2)+" €"}</div>
                    <div className="menu-dot" ><img width="100%" src={unfold} alt=""/></div>
                </div>
            }
            
            <Modal show={showDel} onHide={handleCloseDel}>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Êtes-vous sûr de vouloir supprimer le menu : {nameMenuDel} </h4>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDel}>Non</Button>
                    <Button variant="primary" onClick={()=>handleDeleteMenu()}>Oui</Button>
                </Modal.Footer>
            </Modal>



            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un produit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {allProduct.map((product)=>
                            <div>
                               {allProductsInMenu.map((el)=>el.id_product).includes(product.id_product)?
                                false
                                :
                                <ProductElement func={refreshAdd} fonction="Add" product={product} menu={props.menu}/>
                               }
                               </div>
                            )}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAdd}>Ok</Button>
                    </Modal.Footer>
            </Modal>
        </div>

    )
}