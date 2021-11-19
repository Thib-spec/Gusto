import fold from "../Images/fold.svg"
import imgcategorie from "Images/imgcategorie.svg"
import unfold from "../Images/unfold.svg"
import React, { Component, useState }  from 'react'
import '../CSS/dropdownComponent.scss'



export default function DropdownComponent({ description, title, status }){
    
    const[open,setOpen]= useState(false);
    
    function handleClick() {
      setOpen(!open);
    }


    return(
        <div className="products-list-element">
            {open===true?
                <div>
                    <div className="products-list-element-title-fold" onClick={()=>handleClick()}>
                        <div>{title}</div>
                        <div className="products-fold"><img width="100%" src={fold} alt=""/></div>
                    </div>
                    <div className="products-list-element-sub">
                        <div className="products-list-element-sub-description">
                            {description}
                        </div>
                    </div>
                </div>   
            :
                <div className="products-list-element-title-unfold" onClick={()=>handleClick()}>
                    <div className="product-title-name">{title}</div>
                    
                    <div className="products-fold"><img width="100%" src={unfold} alt=""/></div>
                </div>
            }
        </div>
        )
}
