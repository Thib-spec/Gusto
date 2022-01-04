import React ,{useEffect,useState} from "react";
import "../../CSS/productPage.scss"
import axios from "axios";
import ProductDropDownComponent from "./ProductDropDownComponent";
import foldBlack from "../../Images/foldBlack.svg"

export default function ProductDropDownCategorie(props){

    
    //On récupère la liste des produits 
    const [allProducts, setallProducts] = useState([]);
    useEffect(() => {
        axios.get("http://api.gustosolutions.fr/api/product")
            .then((res) =>{setallProducts(res.data)
            })
            .catch((err) => console.log(err));
    }, [])

    //Fonction appelé lors de la mise à jour des informations d'un produits
    const refreshProductUpdate = (data) => {
        const array= new Array()
        allProducts.map((el)=>
            data.id_product!=el.id_product?array.push(el):array.push(data)
        )
        console.log(array)
        setallProducts(array)
    }

    //Fonction appelé lors de la suppression d'un produit
    const refreshProductDelete = (data) => {
        const array= new Array()
        allProducts.map((el)=>

            data.id_product!=el.id_product?array.push(el):false
        )
        setallProducts(array)
    }


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
                    {/*On map la liste des produits de la catégorie*/}
                    {allProducts.map((product) => (
                        
                        product.fk_id_category==props.categorie.id_category?
                            <ProductDropDownComponent funcDeleteProduct={refreshProductDelete} funcUpdate={refreshProductUpdate} product={product} key={product.id_product} id_category={props.categorie.id_category}/>
                        :false
                    ))}
                </div>
            :false
            }
        </div> 
    )
}