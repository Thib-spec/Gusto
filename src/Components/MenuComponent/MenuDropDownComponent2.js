import React ,{useState,useEffect} from "react";
import axios from "axios"
import fold from "../../Images/fold.svg"
import unfold from "../../Images/unfold.svg"
import "../../CSS/menuPage.scss"
import ProductMenu from "./ProductMenu";
import ArrayController from "helpers/ArrayController/index";

import ArrayControllerMenu from "helpers/ArrayController/ArrayControllerMenu";
import {Modal, Button} from 'react-bootstrap'
import ProductElement from "./ProductElement";
import ProductMenu2 from "./ProductMenu2";



export default function MenuDropDownComponent2(props){

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const [nameMenuDel, setnameMenuDel] = useState("");

    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => {
        
        setnameMenuDel(props.menu.web_label)
        setShow(true);
   }
   const handleShow2 = () => {
        
    setShow2(true);
}


   
    const [open, setOpen] = useState(false);
    function handleOpen() {
        setOpen(!open);
    }

    const [allProductsInMenu, setallProductsInMenu] = useState([]);





    useEffect(() => {
        axios.get("http://api.gustosolutions.fr/api/menu/"+props.menu.id_menu+"/product")
            .then((res) =>{setallProductsInMenu(res.data)})
            
            .catch((err) => console.log(err));
    }, [])


    function handleDeleteMenu(){
        axios.delete("http://api.gustosolutions.fr/api/menu/"+props.menu.id_menu)
        .then((res) => {
            console.log(res);
            
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
       });
    }

    function handleSave(){

    //     let array = new Array()
        
    //     let array1 = new Array()
       
    //         axios.delete("http://api.gustosolutions.fr/api/menu/"+props.menu.id_menu+"/removeProduct",{"data": array})
    //            .then((res) => {
    //                console.log(res);
    //                setallProductsInMenu([])

    //                axios.post("http://api.gustosolutions.fr/api/menu/"+props.menu.id_menu+"/products",array1)
    //                .then((res) => {
    //                    console.log(res);
    //                })
    //                .catch((err) => {
    //                     console.log(err);
    //                });



    //            })
    //            .catch((err) => {
    //                 console.log(err);
    //            });

         
     }

    const [allProduct, setallProduct] = useState([]);

    function handleAddProduct(){

        axios.get("http://api.gustosolutions.fr/api/product")
            .then((res) =>{setallProduct(res.data)
            })
            .catch((err) => console.log(err));

        handleShow2(true)
    }

    const[edition,setEdition]=useState(false)
    function handleCancel(){
        setEdition(false)
    }
    function handleEdition(){
        setEdition(true)
        
    }
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
            {open===true?
                <div>

                    <div className="menu-list-element-title-fold" onClick={() => handleOpen()}>
                        <div>{props.menu.web_label}</div>
                        <div>{props.menu.fridge_label}</div>
                        <div>{props.menu.price}</div>
                        <div className="menu-dot" ><img width="100%" src={fold} alt=""/></div>
                    </div>
                    <div className="menu-list-element-sub">
                        <div className="menu-list-element-sub-description">
                           {/* {allProductsInMenu2.value.map((product)=>
                           <div>
                                <ProductMenu product={allProductsInMenu2.get()}/>
                            </div>
                            )
                            } */}
                            <div>
                                
                                
                                {allProductsInMenu.map((product)=>
                                    
                                    <ProductElement func={refreshDel} edition={edition} color="green" product={product} menu={props.menu}/>)
                                    
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
                                    <button type="button" className="menu-list-element-sub-buttons-element btn btn-secondary" onClick={()=>handleCancel()}>Exit</button>
                            
                                </div>
                                :
                                <div class="menu-list-element-sub-buttons ">
                                    <button type="button" className="menu-list-element-sub-buttons-element btn btn-info" onClick={()=>handleEdition()}>Modifier</button>
                                    <button type="button" className="menu-list-element-sub-buttons-element btn btn-danger" onClick={()=>handleShow()}>Supprimer</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            :
                <div className="menu-list-element-title-unfold" onClick={() => handleOpen()}>
                    <div>{props.menu.fridge_label}</div>
                    <div>{props.menu.price}</div>
                    <div className="menu-dot" ><img width="100%" src={unfold} alt=""/></div>
                </div>
            }
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Êtes-vous sûr de vouloir supprimer le menu : {nameMenuDel} </h4>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Non</Button>
                    <Button variant="primary" onClick={()=>handleDeleteMenu()}>Oui</Button>
                </Modal.Footer>
            </Modal>



            <Modal show={show2} onHide={handleClose2}>
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
                                <ProductElement func={refreshAdd} color="grey" product={product} menu={props.menu}/>
                               }
                               </div>
                            )}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>Ok</Button>
                    </Modal.Footer>
            </Modal>
        </div>

    )
}