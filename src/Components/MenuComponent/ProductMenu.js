import React ,{useState,useEffect} from "react";
import "../../CSS/menuPage.scss"
import ArrayControllerMenu from "helpers/ArrayController/ArrayControllerMenu";


export default function ProductMenu(props){
    // const allProductsInMenu = new ArrayControllerMenu(useState([]), useState([]));
    // allProductsInMenu.set(props.allProductsInMenu2, { init: true })
    
    const[show,setshow]=useState(true)
    
      const removeProduct = () => {
          
            
            props.product2.remove(props.product);
            
            
      };

    return(
        <div>

            {
                console.log("frg",props.product2.ArrayController.value.find(el=>el.id_product==props.product.id_product).label)
             
            }
        {
            show?
                <div className="menu-list-element-sub-description-element">
                    {/* <div className="menu-list-element-sub-description-element-element" id="labelElementMenu">{props.product.label}</div>  */}
                    <div className="menu-list-element-sub-description-element-element" id="labelElementMenu">{props.product2.ArrayController.value.find(el=>el.id_product==props.product.id_product).label}</div>
                    {/* <button type="button" className="btn btn-danger menu-list-element-sub-description-element-element" id="btnDelElementMenu" onClick={()=>setshow(false)}>X</button>  */}
                    <button type="button" className="btn btn-danger menu-list-element-sub-description-element-element" id="btnDelElementMenu" onClick={removeProduct}>X</button> 
                </div>
            :false
        }
        </div>
    )
}