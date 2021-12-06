import "../CSS/header.scss";
import logo from "Charte_graphique/Logo/Colors/Logo_Gusto_Colors.svg";
import profilpp from "Charte_graphique/Logo/Colors/user.svg";
import profilpp1 from "../Images/imageprofil.png";

import DATAUtilisateurs from "../Data/utilisateurs";
import iconeMenu from "Charte_graphique/Logo/Colors/menu.svg";
import iconeMenu1 from "../Images/iconeMenu.png";

import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import userActions from "store/actions/userActions";
import HeaderProfil from "./HeaderProfil";

export default function Header() {
  const [over, setover] = useState(false);
  const [path, setpath] = useState("Accueil");

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  function onOver() {
    setover(true);
  }
  function onNotOver() {
    setover(false);
  }

  let history = useHistory();

  function handleLogin() {
    history.push("/Login");
    setpath("Login");
  }
  async function handleLogout() {
    try {
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
    history.push("/");
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
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="header-top-name-container">
          <div className="header-top-name">{`${
            user.client ? user.client.name : ""
          }`}</div>
        </div>
        <div className="header-top-profil-container">
          <HeaderProfil
            lastName={user.lastName}
            firstName={user.firstName}
            level={user.level.label}
          />
        </div>
      </div>

      <div className="header-bottom">
        <img
          src={iconeMenu}
          alt=""
          className="header-bottom-menuIcone"
          onMouseEnter={onOver}
          onMouseLeave={onNotOver}
        />
        <div className="header-bottom-path">{path}</div>
      </div>
      {over ? (
        <div
          className="header-bottom-menuList"
          onMouseEnter={onOver}
          onMouseLeave={onNotOver}
        >
          <div
            className="header-bottom-menuList-button"
            onClick={handleAccueil}
          >
            Accueil
          </div>
          <div className="header-bottom-menuList-button" onClick={handleFrigo}>
            Fridges
          </div>
          <div className="header-bottom-menuList-button" onClick={handlePreset}>
            Preset
          </div>
          <div className="header-bottom-menuList-button" onClick={handleMenus}>
            Menus
          </div>
          <div className="header-bottom-menuList-button" onClick={handlePromo}>
            Promotions
          </div>
          <div
            className="header-bottom-menuList-button"
            onClick={handleProducts}
          >
            Produits
          </div>
          <div
            className="header-bottom-menuList-button"
            onClick={handleCategories}
          >
            Catégories
          </div>
          {/* <div className="header-bottom-menuList-button" onClick={handleLogin}>Login</div> */}
          <div className="header-bottom-menuList-button" onClick={handleLogout}>
            Logout
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
}
