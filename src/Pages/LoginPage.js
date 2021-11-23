import logoGustoColors from "Images/Logo_Gusto_Colors.svg";
// import "CSS/loginPage.css";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import api from "helpers/api";
import userActions from "store/actions/userActions";
import Page from "Components/Page";

export default function LoginPage({ location, history }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  // appel api
  async function handleLogin() {
    console.log("salut")
    try {
      const res = await api.login({ body: { email:username, password } });
      console.log(res)
      if (res.ok) {
        const resJSON = await res.json();
        dispatch(userActions.login({ ...resJSON, isLogged: true }));
        localStorage.setItem("authToken", resJSON.authToken);
        history.push("/");
      } else {
        setAlert(
          <div class="alert alert-danger" role="alert">
            response status : {res.status}
          </div>
        );
      }
    } catch (error) {
      console.log(error)
      setAlert(
        <div class="alert alert-danger" role="alert">
          error : 
        </div>
      );
    }
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(<div></div>);

  return (
    <>
      <Page>
        <div
          className={`row justify-content-center ${
            global.colorFull ? "green" : ""
          }`}
        >
          <div
            className={`col-12 col-sm-11 col-md-9 col-lg-8 col-xl-6 ${
              global.colorFull ? "red" : ""
            }`}
          >
            <div
              className={`card mycard ${global.colorFull ? "bg-dark" : ""}`}
            >
              <div className="card-body p-5 text-center">
                <div className="">
                  <img
                    className="card-img-top"
                    src={logoGustoColors}
                    alt="Card image cap"
                  />
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-lock-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                      </svg>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon2"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  <div className="form-check d-flex mb-2">
                    <input
                      className="form-check-input blue-checked"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      // checked
                    />
                    <label
                      className="form-check-label "
                      htmlFor="flexCheckChecked"
                    >
                      &nbsp; Restez connecté ?
                    </label>
                  </div>
                  <button
                    onClick={handleLogin}
                    type="submit"
                    className="btn btn-dark blue mb-2 col-12"
                  >
                    Connexion
                  </button>
                </div>
                <hr className="my-2" />
                <div className="">
                  <label className="form-check-label">
                    Mot de passe oublié ?
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {alert}
      </Page>
    </>
  );
}
