import "CSS/loginPage.css";

export default function LoginPage({ location }) {
  console.log(location);

  return (
    <>
      <div class="container-fluid vh-100">
        <div class="container h-100 py-5">
          <div class="row h-100 justify-content-center d-flex">
            <div class="col-12 col-md-9 col-lg-8 col-xl-7">
              <div class="card bg-dark text-white h-100">
                <div class="card-body p-5 text-center">
                  <div class="">
                    <h3 class="mb-3">Login</h3>
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        @
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
                      <span class="input-group-text" id="basic-addon1">
                        @
                      </span>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div class="form-check d-flex mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                      &nbsp; Restez connectez ?
                      </label>
                    </div>
                    <button type="submit" class="btn btn-primary mb-2 col-12">
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
