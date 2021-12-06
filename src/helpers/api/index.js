import requester from "./requester";

const API = function ({ url, host, fake, ssl, port, authToken }) {
  this.ssl = ssl == true ? true : ssl == false ? false : false;
  this.protocol = this.ssh ? "https" : "http";
  this.host = host ? host : "localhost";
  this.port = port ? `:${port}` : "";
  this.url = url ? url : `${this.protocol}://${this.host}${this.port}`;
  this.fake = fake == true ? true : fake == false ? false : false;
  this.authToken = authToken;
  this.requester = requester(this);
};

// ---------- auth ---------- //

API.prototype.login = function ({ body } = {}) {
  return this.requester({
    method: "POST",
    path: "/api/user/login",
    body,
  });
};

API.prototype.logout = function ({} = {}) {
  const res = this.requester({ method: "GET", path: "/api/user/logout" });
  return res;
};

API.prototype.getInfo = function ({} = {}) {
  const res = this.requester({ method: "GET", path: `/api/me` });
  return res;
};

// ---------- fridge ---------- //

API.prototype.getFridges = function ({} = {}) {
  return this.requester({
    method: "GET",
    path: "/api/fridge",
  });
};

API.prototype.getProductsInFridge = function ({ id } = {}) {
  return this.requester({
    method: "GET",
    path: `/api/fridge/${id}/products`,
  });
};

API.prototype.getMenusInFridge = function ({ id } = {}) {
  return this.requester({
    method: "GET",
    path: `/api/fridge/${id}/menus`,
  });
};

API.prototype.addProductsInFridge = function ({ id, body } = {}) {
  return this.requester({
    method: "POST",
    path: `/api/fridge/${id}/products`,
    body,
  });
};

API.prototype.addMenusInFridge = function ({ id, body } = {}) {
  return this.requester({
    method: "POST",
    path: `/api/fridge/${id}/menus`,
    body,
  });
};

API.prototype.getAllProducts = function ({} = {}) {
  return this.requester({
    method: "GET",
    path: `/api/product`,
  });
};

API.prototype.getAllMenus = function ({} = {}) {
  return this.requester({
    method: "GET",
    path: `/api/menu`,
  });
};

// ---------- users ---------- //

// API.prototype.getUsers = async function ({}) {
//   const res = await this.requester({ method: "GET", path: "/users" });
//   return res;
// };

// API.prototype.createUser = async function ({ body }) {
//   const res = await this.requester({ method: "POST", path: "/users", body });
//   return res;
// };

// API.prototype.getOneUser = async function ({ id }) {
//   const res = await this.requester({ method: "GET", path: `/users/${id}` });
//   return res;
// };

// API.prototype.updateOneUser = async function ({ id, body }) {
//   const res = await this.requester({
//     method: "POST",
//     path: `/users/${id}`,
//     body,
//   });
//   return res;
// };

// API.prototype.deleteOneUser = async function ({ id }) {
//   const res = await this.requester({ method: "DELETE", path: `/users/${id}` });
//   return res;
// };

// export default new API({ url: process.env.API_HOST, fake: true });
export default new API({
  url: process.env.REACT_APP_API_URL,
  authToken: localStorage.getItem("authToken"),
});
