import React from "react"
import "CSS/footer.scss"
import iconGusto from "../Charte_graphique/Icon/Colors/Icon_Gusto_Colors.svg"
import { useHistory } from "react-router";


export default function Footer(){

    let history = useHistory();

    function handleClickMentionsLegales(){
        history.push("/mentions");
    }

    return(
        
        <div className="container-footer">
            <img className="footer-logo" src={iconGusto} alt=""/>
            <div className="footer-contact">
                <div className="fs-4">Contact :</div>
                <div>Augustin Peugnet</div>
                <div>Tel : 06 XX XX XX XX</div>
            </div>
            <div className="footer-mention" onClick={()=>handleClickMentionsLegales()}>
                Mentions légales
            </div>
        </div>
        
    )
}