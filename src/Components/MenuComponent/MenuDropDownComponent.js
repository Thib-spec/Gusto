import React ,{useState,useEffect} from "react";
import axios from "axios"
import fold from "../../Images/fold.svg"
import unfold from "../../Images/unfold.svg"
import "../../CSS/menuPage.scss"
import ProductDropDownMenu from "./ProductDropDownMenu";
import ArrayControllerMenu from "helpers/ArrayController/ArrayControllerMenu";
import {Modal, Button} from 'react-bootstrap'



export default function MenuDropDownComponent(props){

    const [show, setShow] = useState(false);
    const [nameMenuDel, setnameMenuDel] = useState("");

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
        setnameMenuDel(props.categorie.label)

   }


    const [val, setVal] = useState(0)

    const [open, setOpen] = useState(false);
    function handleOpen() {
        setOpen(!open);
    }

    const [allProductsInMenu, setallProductsInMenu] = useState([]);
    // const allProductsInMenu2 = new ArrayController(useState([]),useState([]))

    const allProductsInMenu2 = new ArrayControllerMenu(useState([]), useState([]));




    useEffect(() => {
        axios.get("http://api.gustosolutions.fr/api/menu/"+props.menu.id_menu+"/product")
            .then((res) =>{setallProductsInMenu(res.data)
                allProductsInMenu2.set(res.data, { init: true }
            )
            })
            .catch((err) => console.log(err));
    }, [])


    function handleAddProduct(){
        axios.post("http://api.gustosolutions.fr/api/menu", {
            })
            .then((res) => {
                console.log(res);
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDeleteMenu(){
        console.log("all products in menu : ",allProductsInMenu2)

        allProductsInMenu2.reset()

        
        //  axios.delete("http://api.gustosolutions.fr/api/menu/"+props.menu.id_menu)
        //      .then((res) => {
        //          console.log(res);
        //          window.location.reload(false);
        //      })
        //      .catch((err) => {
        //          console.log(err);
        //      });
    }

    function handleSave(){
        console.log("all products in menu : ",allProductsInMenu2)
        allProductsInMenu2.clear()
    }



    return(
        <div className="menu-list-element">
            {}
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
                           {allProductsInMenu2.value.map((product)=>
                           <div>
                                <ProductDropDownMenu product={allProductsInMenu2.get(product.id_product)}/>
                            </div>
                            )
                            }
                            {/* {allProductsInMenu2.value.map((product)=>
                                <div>
                                    {
                                        console.log(product)
                                    }
                                <ProductDropDownMenu product2={allProductsInMenu2.get(product.id_product)}/>
                                </div>
                            )
                            } */}
                        </div>
                        <div class="menu-list-element-sub-buttons ">
                            <button type="button" className="menu-list-element-sub-buttons-element btn btn-info" onClick={()=>handleSave()}>Enregistrer</button>
                            <button type="button" className="menu-list-element-sub-buttons-element btn btn-danger" onClick={()=>handleShow()}>Supprimer</button>
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
        </div>

    )
}