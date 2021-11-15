import "CSS/productPage.scss"

import UploadForm from "Components/FormComponent/UploadForm"
import SelectForm from "Components/FormComponent/SelectForm"
import InputForm from "Components/FormComponent/InputForm"
import CheckboxForm from "Components/FormComponent/CheckboxForm"
import { useState } from "react"


export default function ProductsPage(){
    const[check,setchecked]=useState(false)

    function handleCheck(){
        if (check==true){
            setchecked(false)
        }
        else{
            setchecked(true)
        }
        
    }

    return(
        <div className="products-container">
            <div className="addProduct-container">
                <div className="addProduct-container-title">
                    Ajouter un produit 
                </div>
                <div className="addProduct-container-form">
                    <InputForm label="Prix" type="number"/>
                    <InputForm label="Nom du produit" type="text"/>
                    <UploadForm/>
                    <div className="addProduct-container-form-categories">
                        <SelectForm className="" one="Fruit" two="Boisson" three="dessert"/>
                        <div className="checkboxForm-container">
                            <input className="checkboxForm-container-input" type="checkbox" id=""/>
                            <label className="checkboxForm-container-label" for="gridCheck">
                                <div className="d-flex flex-column">
                                    <div>Nouvelle</div>
                                    <div>catégorie</div>
                                </div>
                            </label>
                        </div>
                    </div> 
                    {check?<div>a</div>:false}
                    
                   
                </div> 
                
                
            </div>
        </div>
    )
}