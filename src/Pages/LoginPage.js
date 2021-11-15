import "CSS/colors.css";
import "CSS/loginPage.css";

import { useSelector, useDispatch } from "react-redux";
// import { login } from 'store/actions/userActions'
import userActions from "store/actions/userActions";

export default function LoginPage({ location, history }) {
  console.log("location : ", location);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  console.log("user : ", user);

  return (
    <>
      <div class="container-fluid vh-100 grey">
        <div class="container h-100 py-5">
          <div class="row h-100 justify-content-center d-flex">
            <div class="col-12 col-md-9 col-lg-8 col-xl-7">
              <div class="card h-100">
                <div class="card-body p-5 text-center">
                  <div class="">
                    <img
                      class="card-img-top"
                      src="/Logo_Gusto_Colors.svg"
                      alt="Card image cap"
                    />
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-person-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          />
                        </svg>
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-lock-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>
                      </span>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon2"
                      />
                    </div>
                    <div class="form-check d-flex mb-2">
                      <input
                        class="form-check-input blue-checked"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        // checked
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        &nbsp; Restez connecté ?
                      </label>
                    </div>
                    {/* <button type="submit" class="btn btn-dark blue mb-2 col-12"> */}
                    <button
                      onClick={() =>{
                        dispatch(
                          userActions.login({
                            firstName: "fred",
                            lastName: "dumont",
                            email: "fred.dumont@hotmail.fr",
                            pp_url: undefined,
                            language: "fr",
                            authToken: "fbdhbfrz",
                          })
                        )
                        history.push("/");
                      }
                      }
                      type="submit"
                      class="btn btn-dark blue mb-2 col-12"
                    >
                      Connexion
                    </button>
                  </div>
                  <hr class="my-2" />
                  <div class="">
                    <label class="form-check-label">
                      Mot de passe oublié ?
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
