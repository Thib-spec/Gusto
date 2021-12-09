import React from "react";
import "../../CSS/TextAreaComponent.css"


export default function TextAreaComponent(props){
    
    
    return(
        <div className="container-textArea">
            <textarea className={props.size=="large"?"textareaLarge-container":"textareaSmall-container"} type={props.type} id={props.id} placeholder={props.placeholder}>
                {props.value}
            </textarea>
        </div>
        
    )

}