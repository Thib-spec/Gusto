import "CSS/categories.scss"
import { useState } from "react"
import DATACatégories from "../Data/categories"
import DATAProducts from "../Data/products"
import dot from "Images/dots.png"


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
                    <div className="categories-list-element-title">
                        <div>{categories.name}</div>
                        <div className="categories-dot"><img width="100%" src={dot} alt=""/></div>
                    </div>

                    <div className="categories-list-element-sub">
                            <div className="categories-list-element-sub-description">{categories.description}</div>
                        {/* {DATAProducts.map((product)=>(
                            <div className="categories-list-element-sub-element">
                                {product.categorie===categories.id?<div>{product.name}</div>:false}<div></div>
                            </div>
                        ))} */}
                    </div>
                    
                    
                </div>
                ))}
            </div>

            
            
        </div>
    // <div className="">
    //     {DATACatégories.map((categories) => (
    //     <div className="">{categories.name}</div>))}
    // </div>
    )
}   