import React ,{useState,useEffect} from "react";
import "../../CSS/menuPage.scss"


export default function ProductDropDownMenu(props){

    const[show,setshow]=useState(true)
    // console.log(props.product2)

    
      const removeProduct = () => {
        console.log(props.product)
            props.product.remove();
     
      };

    return(
        <div>
        {
            show?
                <div className="menu-list-element-sub-description-element">
                    {/* <div className="menu-list-element-sub-description-element-element" id="labelElementMenu">{props.product.label}</div>  */}
                    <div className="menu-list-element-sub-description-element-element" id="labelElementMenu">{console.log("aa : ",props.product)}</div>
                    {/* <button type="button" className="btn btn-danger menu-list-element-sub-description-element-element" id="btnDelElementMenu" onClick={()=>setshow(false)}>X</button>  */}
                    <button type="button" className="btn btn-danger menu-list-element-sub-description-element-element" id="btnDelElementMenu" onClick={removeProduct}>X</button> 
                </div>
            :false
        }
        </div>
    )
}