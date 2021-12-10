import requester from "./requester";

const API = function ({ url, host, fake, ssl, port, authToken }) {
  this.ssl = ssl == true ? true : ssl == false ? false : false;
  this.protocol = this.ssh ? "https" : "http";
  this.host = host ? host : "localhost";
  this.port = port ? `:${port}` : "";
  this.url = url ? url : `${this.protocol}://${this.host}${this.port}`;
  this.fake = fake == true ? true : fake == false ? false : false;
  this.requester = requester(this);
};

API.prototype.setAuthToken = function (authToken) {
  this.authToken = authToken;
};

API.prototype.removeAuthToken = function () {
  this.authToken = undefined;
};

// ---------- user ---------- //

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
  const res = this.requester({ method: "GET", path: `/api/user/userInfo` });
  return res;
};

// ---------- fridge ---------- //

API.prototype.getAllFridges = function ({} = {}) {
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

// ---------- product ---------- //

API.prototype.getAllProducts = function ({} = {}) {
  return this.requester({
    method: "GET",
    path: `/api/product`,
  });
};

// ---------- menu ---------- //

API.prototype.getAllMenus = function ({} = {}) {
  return this.requester({
    method: "GET",
    path: `/api/menu`,
  });
};

// ---------- preset ---------- //

API.prototype.getAllPresets = function ({} = {}) {
  return this.requester({
    method: "GET",
    path: "/api/fridgePreset",
  });
};

API.prototype.createPresets = function ({ body } = {}) {
  return this.requester({
    method: "POST",
    path: `/api/fridgePreset`,
    body,
  });
};

API.prototype.deletePreset = function ({ id, body } = {}) {
  return this.requester({
    method: "DELETE",
    path: `/api/fridgePreset/${id}`,
    body,
  });
};

API.prototype.updatePreset = function ({ id, body } = {}) {
  return this.requester({
    method: "PUT",
    path: `/api/fridgePreset/${id}`,
    body,
  });
};

// ---------- product in preset ---------- //

API.prototype.getProductsInPreset = function ({ id } = {}) {
  return this.requester({
    method: "GET",
    path: `/api/fridgePreset/${id}/products`,
  });
};

API.prototype.addProductsInPreset = function ({ id, body } = {}) {
  return this.requester({
    method: "POST",
    path: `/api/fridgePreset/${id}/addProduct`,
    body,
  });
};

API.prototype.removeProductInPreset = function ({ id, idProduct, body } = {}) {
  return this.requester({
    method: "DELETE",
    path: `/api/fridgePreset/${id}/removeProduct/${idProduct}`,
    body,
  });
};

API.prototype.updateProductInPreset = function ({ id, idProduct, body } = {}) {
  return this.requester({
    method: "PUT",
    path: `/api/fridgePreset/${id}/editProduct/${idProduct}`,
    body,
  });
};

// ---------- menu in preset ---------- //

API.prototype.getMenusInPreset = function ({ id } = {}) {
  return this.requester({
    method: "GET",
    path: `/api/fridgePreset/${id}/menus`,
  });
};

API.prototype.addMenusInPreset = function ({ id, body } = {}) {
  return this.requester({
    method: "POST",
    path: `/api/fridgePreset/${id}/addMenu`,
    body,
  });
};

API.prototype.removeMenuInPreset = function ({ id, idMenu, body } = {}) {
  return this.requester({
    method: "DELETE",
    path: `/api/fridgePreset/${id}/removeMenu/${idMenu}`,
    body,
  });
};

API.prototype.updateMenuInPreset = function ({ id, idMenu, body } = {}) {
  return this.requester({
    method: "PUT",
    path: `/api/fridgePreset/${id}/editMenu/${idMenu}`,
    body,
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
});
