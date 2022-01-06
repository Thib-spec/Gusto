import React from "react";
import "../../CSS/buttonFridge.scss"

export default function ButtonFridge({label}){

    return (
        <div className="buttonContainerFridge">
            {label}
        </div>
    )
}