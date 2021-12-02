import React ,{useEffect,useState} from "react";
import "../CSS/productPage.scss"
import axios from "axios";
import ProductDropDownComponent from "./ProductDropDownComponent";
import DATACatégories from "Data/categories"
import DATAProducts from "Data/products"
import fold from "../Images/fold.svg"
import foldBlack from "../Images/foldBlack.svg"
import imgcategorie from "Images/imgcategorie.svg"
import unfold from "../Images/unfold.svg"

export default function CategorieinProductDropDown(props){

    const [allProducts, setallProducts] = useState([]);
    useEffect(() => {
        axios.get("http://api.gustosolutions.fr/api/product")
            .then((res) =>{setallProducts(res.data)
            })
            .catch((err) => console.log(err));
    }, [])

    

     //open and close the dropdown on click
     const [open, setOpen] = useState(true);
     function handleOpen() {
         setOpen(!open);
     }

    return(
        <div>
            <div className="products-categories-dropdownElement" onClick={()=>handleOpen()}>
                <div className="products-fold">{open?<img className="rotate45" width="100%" src={foldBlack} alt=""/>:<img className="rotate90" width="100%" src={foldBlack} alt=""/>}</div>
                <div className="products-categories-dropdownElement-name" >{props.categorie.label}</div>
            </div>
            {open?
                <div>
                {allProducts.map((product) => (
                    product.fk_id_category==props.categorie.id_category?
                        <ProductDropDownComponent product={product} key={product.id_product}/>
                    :false
                ))}
                </div>
            :false
            }
        </div> 
    )
}
