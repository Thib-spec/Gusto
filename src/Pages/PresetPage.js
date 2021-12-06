import React, { Component, useState, useEffect } from "react";
import "../CSS/presetPage.scss" 
import PresetComponent from "../Components/PresetComponent/PresetComponent"
import axios from 'axios'

export default function PresetPage(){

    const [allProducts, setallProducts] = useState([]);
    useEffect(() => {
        axios.get("http://api.gustosolutions.fr/api/product")
            .then((res) =>{setallProducts(res.data)
            })
            .catch((err) => console.log(err));
    }, [])



    return(
        <div className="container-preset-page">
            <div>
                <PresetComponent allProducts={allProducts}/>
                
                
                <button type="button">Ajouter un preset</button>
            </div>
        </div>
    )
}