import React, { useState } from "react";
import styled from 'styled-components'
import imgcategorie from "Images/imgcategorie.svg"
import axios from "axios"


export default function ProductElement(props){
    //console.log("menu : ",props.menu)

    //Utilisation de la librairie styled-components permettant de faire d'appliquer du css à des balises 
    const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height:5em;
    justify-content:space-evenly;
    `
    
    //Création d'un array contenant la liste des fk_id des produit à ajouter dans le menu (Au final on ne met qu'un seul élément à la fois)
   
    //Fonction permettant l'ajout d'un produit dans un menu
    function AddProduct(){
        let array1 =new Array()
        array1.push({"fk_id_product":props.product.id_product})
         axios.post("http://api.gustosolutions.fr/api/menu/"+props.menu.id_menu+"/products",array1)
         .then((res) => {
             console.log(res);
             props.func(props.product)
         })
         .catch((err) => {
             console.log(err);
         });

    }

    //Même chose mais pour la supression d'un produit dans un menu

    function removeProduct(){
        let array=new Array()
        array.push({"fk_id_product":props.product.id_product})
        axios.delete("http://api.gustosolutions.fr/api/menu/"+props.menu.id_menu+"/removeProduct",{"data": array})
        .then((res) => {
            console.log(res);
            props.func(props.product)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    
    
    return(
        <Container>
            <img src={imgcategorie} alt=""/>
            <div>{props.product.label}</div>
            {props.fonction=="Delete"?
            <div>
                {
                    props.edition?<button type="button" className="btn btn-danger menu-list-element-sub-description-element-element" id="btnDelElementMenu" onClick={(el=>removeProduct())}>X</button> 
                    :false
                }
            </div>  
            :
            <div>
                <button type="button" className="btn btn-secondary" onClick={()=>AddProduct()}><>Ajouter</></button>
            </div>
            }
           
        </Container>
    )
}