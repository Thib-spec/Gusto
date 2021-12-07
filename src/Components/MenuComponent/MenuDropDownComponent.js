import React ,{useState,useEffect} from "react";
import axios from "axios"
import fold from "../../Images/fold.svg"
import unfold from "../../Images/unfold.svg"

export default function MenuDropDownComponent(props){

    const [open, setOpen] = useState(false);
    function handleOpen() {
        setOpen(!open);
    }


    const [allProductsInMenu, setallProductsInMenu] = useState([]);
    useEffect(() => {
        axios.get("http://api.gustosolutions.fr/api/menu/"+props.menu.id_menu+"/products")
            .then((res) =>{setallProductsInMenu(res.data)
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
        axios.delete("http://api.gustosolutions.fr/api/menu/"+props.menu.id_menu)
            .then((res) => {
                console.log(res);
                window.location.reload(false);

            })
            .catch((err) => {
                console.log(err);
            });

    }

    

    

    return(
        <div className="categories-list-element">
            {open===true?
                <div>
                    <div className="categories-list-element-title-fold" onClick={() => handleOpen()}>
                        <div>{props.menu.web_label}</div>
                        <div>{props.menu.fridge_label}</div>
                        <div>{props.menu.price}</div>
                        <div className="categories-dot" ><img width="100%" src={fold} alt=""/></div>
                    </div>
                    <div className="categories-list-element-sub">
                        <div className="categories-list-element-sub-description">
                            {allProductsInMenu.map((product)=>
                            <div>{product.label}</div>
                            )
                            }
                        </div>
                        <div class="categories-list-element-sub-buttons ">
                            <button type="button" className="categories-list-element-sub-buttons-element btn btn-info">Enregistrer</button>
                            <button type="button" className="categories-list-element-sub-buttons-element btn btn-danger" onClick={()=>handleDeleteMenu()}>Supprimer</button>
                        </div>
                    </div>
                </div> 
            :
                <div className="categories-list-element-title-unfold" onClick={() => handleOpen()}>
                    <div>{props.menu.fridge_label}</div>
                    <div>{props.menu.price}</div>
                    <div className="categories-dot" ><img width="100%" src={unfold} alt=""/></div>
                </div>
            }
        </div>
    
    )
}