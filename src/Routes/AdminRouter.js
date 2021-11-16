import Test1 from "Components/TestHistory";
import Test2 from "Components/TestHistory2";
import React, { Component, useState, useEffect } from "react";

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
import NotFoundPage from "Pages/NotFoundPage";
import TestData from "Components/TestData";
import Header from "Components/Header";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import userActions from "store/actions/userActions";

function AdminRouter({history}) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect( ()=>{
    if (localStorage.getItem("authToken")){
      getUserInfoAndDispatch();
    }
  },[])

  // if (!user.email) {
  //   getUserInfoAndDispatch();
  // }

  async function getUserInfoAndDispatch() {
    const res = await api.getInfo();
    console.log("res : ", res);
    dispatch(userActions.update({...(await res.json()), isLogged:true}));
  }

  console.log("user : ", user);

  const authToken = localStorage.getItem("authToken");

  console.log("authToken : ", authToken);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  if (authToken)
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/categories" component={CategoriesPage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/testHistory1" component={Test1} />
          <Route path="/testHistory2" component={Test2} />
          <Route path="/testData" component={TestData} />
          <Route path="/" component={NotFoundPage} />
        </Switch>
      </>
    );
  else
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

export default AdminRouter;
