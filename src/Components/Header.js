import '../CSS/header.scss'
import logo from '../Images/logoGusto1.png'
import profilpp from '../Images/imageprofil.png'
import DATAUtilisateurs from '../Data/utilisateurs'
import iconeMenu from '../Images/iconeMenu.png'
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import userController from "helpers/controllers/userController";



export default function Header(){

    const [over, setover] = useState(false);
    const [path, setpath] = useState("Accueil");

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();


    function onOver(){
        setover(true)
    }function onNotOver(){
        setover(false)
    }

    let history=useHistory();

    function handleLogin(){
        history.push("/Login");
        setpath("Login")
    }
    // function handleLogout(){
    //     dispatch(
    //         userActions.logout()
    //       )
    // }
    function handleProducts(){
        history.push("/Products");
        setpath("Produits")
    }
    function handleCategories(){
        history.push("/Categories");
        setpath("Catégories")
    }
    function handleAccueil(){
        history.push("/");
        setpath("Accueil")
    }
    function handleFrigo(){
        history.push("/");
        setpath("Réfrigérateurs")
    }
    function handleMenus(){
        history.push("/");
        setpath("Menus")
    }
    function handlePromo(){
        history.push("/");
        setpath("Promotions")
    }
    

    return(



        <div>
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
            
            <div className="header-bottom">
                <img src={iconeMenu} alt="" className="header-bottom-menuIcone" onMouseEnter={onOver} onMouseLeave={onNotOver}/>
                <div className="header-bottom-path">{path}</div>
            </div>
            {
                    over?
                    <div className="header-bottom-menuList" onMouseEnter={onOver} onMouseLeave={onNotOver}>
                        <div className="header-bottom-menuList-button" onClick={handleAccueil}>Accueil</div>
                        <div className="header-bottom-menuList-button" onClick={handleFrigo}>Réfrigérateurs</div>
                        <div className="header-bottom-menuList-button" onClick={handleMenus}>Menus</div>
                        <div className="header-bottom-menuList-button" onClick={handlePromo}>Promotions</div>
                        <div className="header-bottom-menuList-button" onClick={handleProducts}>Produits</div>
                        <div className="header-bottom-menuList-button" onClick={handleCategories}>Catégories</div>
                        {/* <div className="header-bottom-menuList-button" onClick={handleLogin}>Login</div> */}
                        <div className="header-bottom-menuList-button" onClick={userController.logout({dispatch, history})}>Logout</div>


                    </div>:false
            }
        </div>
        
    )
}