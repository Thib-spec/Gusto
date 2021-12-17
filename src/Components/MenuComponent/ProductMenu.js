import React ,{useState,useEffect} from "react";
import "../../CSS/menuPage.scss"
import ArrayControllerMenu from "helpers/ArrayController/ArrayControllerMenu";


export default function ProductMenu(props){
    // const allProductsInMenu = new ArrayControllerMenu(useState([]), useState([]));
    // allProductsInMenu.set(props.allProductsInMenu2, { init: true })
    
    const[show,setshow]=useState(true)
    console.log(props.product2)
    console.log("product2 ",props.product2.value.label)
    
      const removeProduct = () => {
          
            
            props.product2.remove(props.product);
            
            
      };

    return(
        <div>

            {

                console.log("JJJJJJJJJJJJJJJJJJJJJJJJJ",props.product),
                console.log("TEST",props.product2.value)
            }
        {
            show?
                <div className="menu-list-element-sub-description-element">
                    {/* <div className="menu-list-element-sub-description-element-element" id="labelElementMenu">{props.product.label}</div>  */}
                    <div className="menu-list-element-sub-description-element-element" id="labelElementMenu">{props.product2.value.label}{console.log("fsdoifhordufseihdu",props.product2.ArrayController.value.label)}</div>
                    {/* <button type="button" className="btn btn-danger menu-list-element-sub-description-element-element" id="btnDelElementMenu" onClick={()=>setshow(false)}>X</button>  */}
                    <button type="button" className="btn btn-danger menu-list-element-sub-description-element-element" id="btnDelElementMenu" onClick={removeProduct}>X</button> 
                </div>
            :false
        }
        </div>
    )
}