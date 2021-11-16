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
import SplashScreen from "Routes/splashScreen";
import LoginPage from "Pages/LoginPage";
import ProductsPage from "Pages/ProductPage";
import NotFoundPage from "Pages/NotFoundPage";
import TestData from "Components/TestData";
import Header from "Components/Header";
import { useSelector, useDispatch } from "react-redux";
import api from "helpers/api";
import userActions from "store/actions/userActions";

function AdminRouter({ history }) {
  console.log("salut")
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const authToken = localStorage.getItem("authToken");
  console.log("authToken : ", authToken);

  const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);

  return (
    <>
      <Route path="/" component={SplashScreen} />
    </>
  );
}

export default AdminRouter;
