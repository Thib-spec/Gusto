import "../CSS/HeaderProfil.scss"
import React from "react"
import profilpp from '../Charte_graphique/Logo/Colors/user.svg'

export default function HeaderProfil(props){
    return(

        
        <div className="container-HeaderProfil">
            <div className="headerProfil-profilInformation">
                <div className="headerProfil-profilInformation-name">
                    {props.firstName} {props.lastName}
                </div>
                <div className="headerProfil-profilInformation-level">
                    {props.level}
                </div>
            </div>
            <div className="headerProfil-whiteSpace"></div>
            <div className="headerProfil-pp-container"><img className="headerProfil-pp" src={profilpp} alt="" /></div>    
        </div>
        
        
    
    )
}