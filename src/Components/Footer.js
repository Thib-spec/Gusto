import React from "react"
import "CSS/footer.scss"
import iconGusto from "../Charte_graphique/Icon/Colors/Icon_Gusto_Colors.svg"

export default function Footer(){
    return(
        <div className="container-footer">
            <img className="footer-logo" src={iconGusto} alt=""/>
            <div className="footer-contact">
                <div className="fs-4">Contact :</div>
                <div>Augustin Peugnet</div>
                <div>Tel : 06 XX XX XX XX</div>
            </div>
            <div className="footer-mention">
                Mentions légales
            </div>
        </div>
    )
}