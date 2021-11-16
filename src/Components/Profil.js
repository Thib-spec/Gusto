import "CSS/header.scss"

import profilpp from '../Images/imageprofil.png'
import DATAUtilisateurs from '../Data/utilisateurs'


export default function Profil(){
    return(
        <div className="header-top-profil-container">
                    <div className="header-top-profil-whiteContainer">
                        <div className="header-top-profil-whiteContainer-name">{DATAUtilisateurs.utilisateurs[0].firstname} {DATAUtilisateurs.utilisateurs[0].lasname}</div>
                        <div className="header-top-profil-whiteContainer-statut">{DATAUtilisateurs.utilisateurs[0].statut}</div>
                    
                    </div>
                    <div className="header-top-profil-whiteSpace">
                    
                    </div>
                    <div className="header-logo-container">
                        <img className="header-logo-pp" src={profilpp} alt="" />
                    </div>
                </div>
    )
}