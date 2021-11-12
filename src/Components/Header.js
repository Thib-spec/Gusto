import '../CSS/header.css'
import logo from '../Images/logoGusto1.png'
import profilpp from '../Images/imageprofil.png'
import DATAUtilisateurs from '../Data/utilisateurs'

export default function Header(){

    return(
        <div className="header-top">
            <div className="header-top-logo-container"><div className="header-top-logo"><img src={logo} alt=""/></div></div>
            <div className="header-top-name-container"><div className="header-top-name">Olivia</div></div>
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
        </div>
    )
}