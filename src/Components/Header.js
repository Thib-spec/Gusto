import '../CSS/header.css'
import logo from '../Images/logoGusto1.png'

export default function Header(){

    return(
        <div className="header-top">
            <div className="header-top-logo-container"><div className="header-top-logo"><img src={logo}/></div></div>
            <div className="header-top-name-container"><div className="header-top-name">Olivia</div></div>
            <div className="header-top-profil-container">profil</div>
        </div>
    )
}