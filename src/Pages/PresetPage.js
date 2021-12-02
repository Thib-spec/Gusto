import React, { Component, useState, useEffect } from "react";
import "../CSS/presetPage.scss" 
import PresetComponent from "../Components/PresetComponent/PresetComponent"

export default function PresetPage(){

    return(
        <div className="container-preset-page">
            <div>
                <PresetComponent/>
                
                
                <button type="button">Ajouter un preset</button>
            </div>
        </div>
    )
}