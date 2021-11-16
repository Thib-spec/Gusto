import "CSS/categories.scss"
import DATACatégories from "../Data/categories"


export default function CategoriesPage(){
    
   

    return(
        <div className="categories-container">
            <div className="categories-list">
                {DATACatégories.map((categories) => (
                <div className="categories-list-element">
                    <div className="categories-list-element-name">{categories.name}</div>
                    <div className="categories-list-element-sub">{categories.list.map((elementInCategorie)=>(<div>{elementInCategorie}</div>))}</div>
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