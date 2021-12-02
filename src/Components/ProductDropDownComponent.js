import "../CSS/productPage.scss"
import React, {useState} from "react"
import fold from "../Images/fold.svg"
import imgcategorie from "Images/imgcategorie.svg"
import unfold from "../Images/unfold.svg"
import axios from "axios";



export default function ProductDropDownComponent(props){

    const [open, setOpen] = useState(false);
    function handleOpen() {
        setOpen(!open);
    }

    //when the client delete a product and confirm it, 
    function handleDelete(){
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

    return(
        <div className="products-list-element">
            {open?
                <div>
                    <div className="products-list-element-title-fold" onClick={()=>handleOpen()}>
                        <div className="product-title-name">{props.product.label}</div>
                        <div className="product-title-dlc">{props.product.ubd}</div>
                        <div className="product-title-prix"><div className="product-title-prix-align">{props.product.price}</div></div>
                        <div className="products-fold"><img width="100%" src={fold} alt=""/></div>
                    </div>
                    <div className="products-list-element-sub">
                        <div className="products-list-element-sub-description">
                            <img src={imgcategorie} alt=""/>
                            <textarea type="text" className=" products-list-element-sub-description-input"  id={"descriptionProduct"+props.product.id_product} placeholder="Description du produit">{props.product.description}</textarea>
                        </div>
                        <div class="products-list-element-sub-buttons ">
                            <button type="button" className="products-list-element-sub-buttons-element btn btn-info" >Enregistrer</button>
                            <button type="button" className="products-list-element-sub-buttons-element btn btn-danger" onClick={()=>handleDelete()}>Supprimer</button>
                        </div>
                    </div>
                </div>   
            :
                <div className="products-list-element-title-unfold" onClick={()=>handleOpen()}>
                    <div className="product-title-name">{props.product.label}</div>
                    <div className="product-title-dlc">{props.product.ubd}</div>
                    <div className="product-title-prix"><div className="product-title-prix-align">{props.product.price}</div></div>
                    <div className="products-fold"><img width="100%" src={unfold} alt=""/></div>
                </div>
            }
        </div>
    )
}