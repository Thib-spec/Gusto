import React ,{useState,useEffect} from "react";
import "../../CSS/menuPage.scss"
import ArrayControllerMenu from "helpers/ArrayController/ArrayControllerMenu";
import axios from "axios"



export default function ProductMenu2({product,edition}){
    console.log(edition)
    
    function removeProduct(){
        let array=new Array()
        array.push({"fk_id_product":product.id_product})
        axios.delete("http://api.gustosolutions.fr/api/menu/"+"1"+"/removeProduct",{"data": array})
        .then((res) => {
            console.log(res);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
    }
      

    return(
        <div>
       
                <div className="menu-list-element-sub-description-element">
                    <div className="menu-list-element-sub-description-element-element" id="labelElementMenu">{product.label}</div>
                    {
                        edition?<button type="button" className="btn btn-danger menu-list-element-sub-description-element-element" id="btnDelElementMenu" onClick={(el=>removeProduct())}>X</button> 
                        :false
                    }
                </div>
            
        
        </div>
    )
}