import "CSS/header.scss";
import logo from "Charte_graphique/Logo/Colors/Logo_Gusto_Colors.svg";
import iconeMenu from "Charte_graphique/Logo/Colors/menu.svg";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import userActions from "store/actions/user.actions";
import HeaderProfil from "./HeaderProfil";


export default function Header() {

  //Initialisation des variables
  const [open, setopen] = useState(false);
  const [openProfil, setopenProfil] = useState(false);
  const [path, setpath] = useState("Accueil");

  const user = useSelector((state) => state.user.value);//On récupère le user
  const dispatch = useDispatch();

  function onOver(){
    setopen(true);
  }
  function onNotOver(){
    setopen(false);
  }

  function onClicked(){
    setopen(!open)
  }

  let history = useHistory();

  //Fonction permettant de changer l'url de l'app et ainsi changer de page grâce au adminRouter.js
  async function handleLogout() {
    try {
      console.log("api.logout() : ");
      const res = await api.logout();
      if (res.ok) {
        dispatch(userActions.logout());
        localStorage.removeItem("authToken");
        history.push("/");
      } else {
      }
    } catch (error) {}
  }

  function handleProducts() {
    history.push("/products");
    setpath("Produits");
  }
  function handleCategories() {
    history.push("/categories");
    setpath("Catégories");
  }
  function handleAccueil() {
    history.push("/");
    setpath("Accueil");
  }
  function handleFrigo() {
    history.push("/fridges");
    setpath("Fridges");
  }
  function handlePreset() {
    history.push("/preset");
    setpath("preset");
  }
  function handleMenus() {
    history.push("/menus");
    setpath("Menus");
  }
  function handlePromo() {
    history.push("/");
    setpath("Promotions");
  }

  return (
    <div>
      <div className="header-top">
        <div className="header-top-logo-container">
          <div className="header-top-logo">
            <img src={logo} alt="" onClick={()=>handleAccueil()}/>
          </div>
        </div>
        <div className="header-top-name-container">
          <div className="header-top-name">{`${user.client ? user.client.name : ""}`}</div>
        </div>
        <div className="header-top-profil-container" onClick={()=>setopenProfil(!openProfil)} onMouseLeave={()=>setopenProfil(false)}>
          <HeaderProfil lastName={user.lastName} firstName={user.firstName} level={user.level.label}/>
          {openProfil ? (
            <div className="header-dropdown-profil">
              <div className="header-dropdown-profil-element">Profil</div>
              <div className="header-dropdown-profil-element" onClick={()=>handleLogout()}>Déconnexion</div>
            </div>)
          :
          (false)
          }
        </div>   
      </div>
      
      <div className="header-bottom">
        <img src={iconeMenu} alt="" className="header-bottom-menuIcone" onMouseEnter={onOver} onMouseLeave={onNotOver} onClick={()=>onClicked()}/>
        <div className="header-bottom-path">{path}</div>
      </div>
      {open ? (
        <div className="header-bottom-menuList"onMouseEnter={onOver} onMouseLeave={onNotOver}>
          <div className="header-bottom-menuList-button" onClick={handleAccueil}>Accueil</div>
          <div className="header-bottom-menuList-button" onClick={handleFrigo}>Fridges</div>
          <div className="header-bottom-menuList-button" onClick={handlePreset}>Preset</div>
          <div className="header-bottom-menuList-button" onClick={handleMenus}>Menus</div>
          {/* <div className="header-bottom-menuList-button" onClick={handlePromo}>Promotions</div> */}
          <div className="header-bottom-menuList-button" onClick={handleProducts}>Produits</div>
          <div className="header-bottom-menuList-button" onClick={handleCategories}>Catégories</div>
        </div>
      ) : (
        false
      )} 
    </div>
  );
}