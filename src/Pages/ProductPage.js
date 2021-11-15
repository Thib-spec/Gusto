import "CSS/productPage.scss"

import UploadForm from "Components/FormComponent/UploadForm"
import SelectForm from "Components/FormComponent/SelectForm"
import InputForm from "Components/FormComponent/InputForm"
import CheckboxForm from "Components/FormComponent/CheckboxForm"
import { useState } from "react"


export default function ProductsPage(){

    return(
        <div className="products-container">
            <div className="addProduct-container">
                <div className="addProduct-container-title">
                    Ajouter un produit 
                </div>
                <div className="addProduct-container-form">
                    <div className="addProduct-container-form-categories">
                        <SelectForm className="" one="Fruit" two="Boisson" three="dessert"/>
                    </div> 
                    <InputForm label="Prix" type="number"/>
                    <InputForm label="Nom du produit" type="text"/>
                    <UploadForm/>
                </div>
            </div>
        </div>
    )
}