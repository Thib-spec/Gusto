import Test1 from "Components/TestHistory";
import Test2 from "Components/TestHistory2";
import React, { Component, useState, useEffect } from "react";
import "CSS/colors.css";
import "CSS/loginPage.css";
import MenusPage from "Pages/MenusPage";

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
import useIsMounted from "helpers/useInMount";
import { withTranslation } from "react-i18next";

function AdminRouter({ history }) {
  const user = useSelector((state) => state.user.value);
  const [isLoaded, setIsLoaded] = useState(true);
  const dispatch = useDispatch();
  const isMounted = useIsMounted();

  // localStorage.removeItem("authToken");
  const authToken = localStorage.getItem("authToken");
  const desac_login = true;

  useEffect(() => {
    console.log("AdminRouter is mount");
    if (authToken || desac_login) {
      getUserInfoAndDispatch().then(() => {
        setIsLoaded(false);
      });
    }
    return () => {
      console.log("AdminRouter is unmount");
    };
  }, []);

  // async function getUserInfoAndDispatch() {
  //   try {
  //     const res = await api.getInfo();
  //     if (res.ok) {
  //       // console.log((await res.json())[0])
  //       if (isMounted.current)
  //         dispatch(
  //           userActions.update({ ...(await res.json())[0], isLogged: true })
  //         );
  //       // dispatch(userActions.update({ ...(await res.json()), isLogged: true }));
  //     } else {
  //     }
  //   } catch (error) {}
  // }

  function getUserInfoAndDispatch() {
    return api
      .getInfo()
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw res;
      })
      .then((resJSON) => {
        console.log("api.getInfo() : ", resJSON);
        dispatch(userActions.login({ ...resJSON }));
      })
      .catch((error) => {
        if (error.res) {
        } else {
          console.log(error);
        }
      });
  }

  // console.log("user : ", user);

  const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);

  // if ((authToken && user.isLogged) || desac_login) {
  if (isLoaded) {
    return <></>;
  } else {
    if (user.isLogged) {
      return (
        <>
          <Header />
          {/* <HeaderL /> */}
          <Switch>
            <Route exact path="/" component={withTranslation()(HomePage)} />
            <Route
              path="/categories"
              component={withTranslation()(CategoriesPage)}
            />
            <Route
              path="/products"
              component={withTranslation()(ProductsPage)}
            />
            <Route
              path="/fridges"
              component={withTranslation()(FridgesPage2)}
            />
            <Route
              path="/menus"
              component={withTranslation()(MenusPage)}
            />
            <Route path="/testHistory1" component={Test1} />
            <Route path="/testHistory2" component={Test2} />
            <Route path="/testData" component={TestData} />
            <Route path="/preset" component={withTranslation()(PresetPage)} />
            <Route path="/login">
              <Redirect
                from={`${location.pathname}`}
                to={{
                  pathname: "/",
                  state: {
                    from: `${location.pathname}`,
                  },
                }}
              ></Redirect>
            </Route>
            <Route path="/" component={withTranslation()(NotFoundPage)} />
          </Switch>
          {/* <Footer/> */}
        </>
      );
    } else {
      return (
        <>
          <Switch>
            <Route path="/login" component={withTranslation()(LoginPage)} />
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
}

export default AdminRouter;
