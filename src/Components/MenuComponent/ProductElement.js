import React, { useState } from "react";
import styled from 'styled-components'
import imgcategorie from "Images/imgcategorie.svg"


export default function ProductElement({product,product2,color}){

    const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height:5em;
    justify-content:space-evenly;
    `
    const[coloor,setcoloor]=useState(color)
    const[elementinMenu,setElementinMenu]= useState(false)

    function handleAdd(){
        setcoloor("green")
    }
    function handleDel(){
        setcoloor("grey")
        product2.remove();
    }
    
    
    return(
        <Container>
            <img src={imgcategorie} alt=""/>
            <div>{product.label}</div>
            {coloor=="green"?
                <button type="button" className="btn btn-primary" onClick={()=>handleDel()}><>Supprimer</></button>
            
            :
            <button type="button" className="btn btn-secondary" onClick={()=>handleAdd()}><>Ajouter</></button>

            }
           
        </Container>
    )
}