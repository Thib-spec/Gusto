import Test1 from "Components/TestHistory";
import Test2 from "Components/TestHistory2";
import React, { Component, useState, useEffect } from "react";
import "CSS/colors.css";
import "CSS/loginPage.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import CategoriesPage from "Pages/CategoriesPage";
import HomePage from "Pages/HomePage";
import LoginPage from "Pages/LoginPage";
import ProductsPage from "Pages/ProductPage";
import FridgesPage2 from "Pages/FridgesPage2";
import NotFoundPage from "Pages/NotFoundPage";
import TestData from "Components/TestData";
import Header from "Components/Header";
import HeaderL from "Components/HeaderL";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import userActions from "store/actions/userActions";
import Footer from "Components/Footer";
import PresetPage from "Pages/PresetPage";

function AdminRouter({ history }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      getUserInfoAndDispatch();
    }
  }, []);

  async function getUserInfoAndDispatch() {
    try {
      const res = await api.getInfo({ id: user.id });
      if (res.ok) {
        dispatch(userActions.update({ ...(await res.json()), isLogged: true }));
      } else {
      }
    } catch (error) {}
  }

  // console.log("user : ", user);

  const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);

  if (authToken) {
    return (
      <>
        <Header />
        {/* <HeaderL /> */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/categories" component={CategoriesPage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/fridges" component={FridgesPage2} />
          <Route path="/testHistory1" component={Test1} />
          <Route path="/testHistory2" component={Test2} />
          <Route path="/testData" component={TestData} />
          <Route path="/preset" component={PresetPage} />
        </Switch>
        {/* <Footer/> */}
      </>
    );
  } else {
    return (
      <>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/">
            <Redirect
              from={`${location.pathname}`}
              to={{
                pathname: "/login",
                state: {
                  from: `${location.pathname}`,
                },
              }}
            ></Redirect>
          </Route>
        </Switch>
      </>
    );
  }
}

export default AdminRouter;
