import "CSS/categories.scss"
import DATACatégories from "../Data/categories"
import DATAProducts from "../Data/products"


export default function CategoriesPage(){
    
   

    return(
        <div className="categories-container">
            <div className="categories-list">
                {DATACatégories.map((categories) => (
                <div className="categories-list-element">
                    <div className="categories-list-element-name">{categories.name}</div>
                    <div className="categories-list-element-sub">
                        {DATAProducts.map((product)=>(
                            <div className="categories-list-element-sub-element">
                                {product.categorie===categories.id?<div>{product.name}</div>:false}<div></div>
                            </div>
                        ))}
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