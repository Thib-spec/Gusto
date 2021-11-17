import "CSS/categories.scss"
import DATACatégories from "../Data/categories"
import DATAProducts from "../Data/products"
import dot from "Images/dots.png"
import InputForm from "Components/FormComponent/InputForm"
import imgcategorie from "Images/imgcategorie.svg"
import fold from "../Images/fold.svg"
import unfold from "../Images/unfold.svg"


import React, { Component, useState }  from 'react'
export default function CategoriesPage(){
    
   const[click,setClicked]= useState(false);
   function handleClick(){
       if (click===true){
           setClicked(false)
       }
       else{
        setClicked(true)
       }
       
   }

    return(
        <div className="categories-container">
            <div className="categories-list">
                {DATACatégories.map((categories) => (
                <div className="categories-list-element">
                    {click?
                        <div className="categories-list-element-title-fold" onClick={handleClick}>
                            <div>{categories.name}</div>
                            <div className="categories-dot" ><img width="100%" src={fold} alt=""/></div>
                        </div>
                        :
                        <div className="categories-list-element-title-unfold" onClick={handleClick}>
                            <div>{categories.name}</div>
                            <div className="categories-dot" ><img width="100%" src={unfold} alt=""/></div>
                        </div>
                        
                        }
                       
                    {
                        click?
                            
                            <div className="categories-list-element-sub">
                                <div className="categories-list-element-sub-description">
                                    <img src={imgcategorie} alt=""/>
                                    <textarea type="text" className=" categories-list-element-sub-description-input"  placeholder="Description de la catégorie" value={categories.description}/>
                                    
                                </div>
                                <div class="categories-list-element-sub-buttons ">
                                    <button type="button" className="categories-list-element-sub-buttons-element btn btn-info">Enregistrer</button>
                                    <button type="button" className="categories-list-element-sub-buttons-element btn btn-danger">Supprimer</button>
                                </div>
                            </div>
                            
                            
                        :false
                        } 

                    
                    
                    
                </div>
                ))}
            </div>
        {/* {DATAProducts.map((product)=>(
                            <div className="categories-list-element-sub-element">
                                {product.categorie===categories.id?<div>{product.name}</div>:false}<div></div>
                            </div>
                        ))} */}  
                        
        {/* <div className="categories-dot-menu-element">Modifier</div>
                                <div className="categories-dot-menu-element">Supprimer</div>  */}
            
        </div>
    // <div className="">
    //     {DATACatégories.map((categories) => (
    //     <div className="">{categories.name}</div>))}
    // </div>
    )
}   

