import React from "react";
import "../../CSS/TextAreaComponent.css"


export default function TextAreaComponent(props){
    
    
    return(
        <div className="container-textArea">
            {
                props.type!=="text"?
                <input type={props.type} className="textareaSmall-container" id={props.id} placeholder={props.placeholder}  defaultValue={props.value} step={props.step}/>
            :
           
            <textarea className={props.size==="large"?"textareaLarge-container":"textareaSmall-container"} type={props.type} id={props.id} placeholder={props.placeholder}>
                {props.value}
            </textarea>
             }
        </div>
        
    )

}