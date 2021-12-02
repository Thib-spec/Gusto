import React, { Component, useState, useEffect } from "react";
import "../../CSS/presetPage.scss" 
import fold from "../../Images/fold.svg"
import unfold from "../../Images/unfold.svg"
import PresetProducts from "./PresetProducts";

export default function PresetPage(){

    //open and close the dropdown on click
    const [open, setOpen] = useState(false);
    function handleOpen() {
        setOpen(!open);
    }

    return(
        <div>
            {open===true?
                <div>
                    <div className="container-presetComponent" onClick={() => handleOpen()}>
                        <div>Preset1</div>
                        <div className="categories-dot" ><img width="100%" src={fold} alt=""/></div>
                    </div>
                    <div className="container-presetComponent-dropDownContent">
                       <PresetProducts className="container-presetComponent-dropDownContent-element"/>
                        
                    </div>
                </div> 
            :
                <div className="container-presetComponent" onClick={() => handleOpen()}>
                    <div>Preset1</div>
                    <div className="categories-dot" ><img width="100%" src={unfold} alt=""/></div>
                </div>
            }
            
        </div>
    )
}