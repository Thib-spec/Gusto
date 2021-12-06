import React , {useState} from "react";
import "../CSS/categories.scss"
import DATAProducts from "../Data/products"
import dot from "Images/dots.png"
import InputForm from "Components/FormComponent/InputForm"
import imgcategorie from "Images/imgcategorie.svg"
import fold from "../Images/fold.svg"
import unfold from "../Images/unfold.svg"
import axios from "axios";



export default function CategorieDropDownComponent(props){

    //Update categorie

    //hooks value of updated categories
    

    //when the client update a categorie and confirm it, 
    function handleUpdateCategorie(){
        try{
            let a=document.getElementById("descriptionCategorie"+props.categorie.id).value
            axios.put("http://api.gustosolutions.fr/api/category/"+props.categorie.id_category,{
                "label":props.categorie.label,
                "image": "imageurl",
                "description" : a
            
            })
            .then((res) => {
                console.log(res);
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        catch(e){
            console.log(e)
        }
    }



    //Delete categorie

    //when the client delete a categorie and confirm it, 
    function handleDeleteCatégorie(){
        try{
            axios.delete("http://api.gustosolutions.fr:3001/api/category/"+props.categorie.id_category)
            .then((res) => {
                console.log(res);
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        catch(e){
            console.log(e)
        }
    }



    //open and close the dropdown on click
    const [open, setOpen] = useState(false);
    function handleOpen() {
        setOpen(!open);
    }


    return(
        <div className="categories-list-element">
            {open===true?
                <div>
                    <div className="categories-list-element-title-fold" onClick={() => handleOpen()}>
                        <div>{props.categorie.label}</div>
                        <div className="categories-dot" ><img width="100%" src={fold} alt=""/></div>
                    </div>
                    <div className="categories-list-element-sub">
                        <div className="categories-list-element-sub-description">
                            <img src={imgcategorie} alt=""/>
                            <textarea type="text" className=" categories-list-element-sub-description-input" id={"descriptionCategorie"+props.categorie.id} placeholder="Description de la catégorie">{props.categorie.description}</textarea>
                        </div>
                        <div class="categories-list-element-sub-buttons ">
                            <button type="button" className="categories-list-element-sub-buttons-element btn btn-info" onClick={()=>handleUpdateCategorie()}>Enregistrer</button>
                            <button type="button" className="categories-list-element-sub-buttons-element btn btn-danger" onClick={()=>handleDeleteCatégorie()}>Supprimer</button>
                        </div>
                    </div>
                </div> 
            :
                <div className="categories-list-element-title-unfold" onClick={() => handleOpen()}>
                    <div>{props.categorie.label}</div>
                    <div className="categories-dot" ><img width="100%" src={unfold} alt=""/></div>
                </div>
            }
        </div>
    )
}
