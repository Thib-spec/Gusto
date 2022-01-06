
/**
 * Class permettant d'utiliser l'API de façon plus "userFriendly"
 * utilise la variable d'environnement "process.env.REACT_APP_API_URL"
 * voir https://create-react-app.dev/docs/adding-custom-environment-variables/ pour 
 *  plus d'information sur l'utilisation des variables d'environnements avec React
 * Le but de cette classe est de ne pas a avoir à modifier tout le code si
 *  les url d'api amènent à changer. 
 * Par exemple ici les url renseignées permettent à récupérer toutes les informations
 *  peu importe l'utilisateur qui les demande. A terme elles devront être changées pour 
 *  que les informations données à l'utilisateur ne soient que pour lui. 
 *  Cependant le code restera le même.
 * Cette Class accède automatiquement au token d'authentification grâce à localStorage.getItem("authToken").
 *  Le token est mis automatiquement dans les requêtes effectuées (voir requester.js)
 */

import requester from "./requester";

const API = function ({ url, host, fake, ssl, port }) {
  this.ssl = ssl == true ? true : ssl == false ? false : false;
  this.protocol = this.ssh ? "https" : "http";
  this.host = host ? host : "localhost";
  this.port = port ? `:${port}` : "";
  this.url = url ? url : `${this.protocol}://${this.host}${this.port}`;
  this.fake = fake == true ? true : fake == false ? false : false;
  this.requester = requester(this);
  console.log(this.url);
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

API.prototype.updateOneFridge = function ({ id, body } = {}) {
  return this.requester({
    method: "PUT",
    path: `/api/fridge/${id}`,
    body,
  });
};

API.prototype.getProductsInOneFridge = function ({ id } = {}) {
  return this.requester({
    method: "GET",
    path: `/api/fridge/${id}/products`,
  });
};

API.prototype.getMenusInOneFridge = function ({ id } = {}) {
  return this.requester({
    method: "GET",
    path: `/api/fridge/${id}/menus`,
  });
};

// API.prototype.addProductsInOneFridge = function ({ id, body } = {}) {
//   return this.requester({
//     method: "POST",
//     path: `/api/fridge/${id}/products`,
//     body,
//   });
// };

// API.prototype.addMenusInOneFridge = function ({ id, body } = {}) {
//   return this.requester({
//     method: "POST",
//     path: `/api/fridge/${id}/menus`,
//     body,
//   });
// };

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

API.prototype.createOnePreset = function ({ body } = {}) {
  return this.requester({
    method: "POST",
    path: `/api/fridgePreset`,
    body,
  });
};

API.prototype.deleteOnePreset = function ({ id, body } = {}) {
  return this.requester({
    method: "DELETE",
    path: `/api/fridgePreset/${id}`,
    body,
  });
};

API.prototype.updateOnePreset = function ({ id, body } = {}) {
  return this.requester({
    method: "PUT",
    path: `/api/fridgePreset/${id}`,
    body,
  });
};

// ---------- product in preset ---------- //

API.prototype.getProductsInOnePreset = function ({ id } = {}) {
  return this.requester({
    method: "GET",
    path: `/api/fridgePreset/${id}/product`,
  });
};

API.prototype.addProductsInOnePreset = function ({ id, body } = {}) {
  return this.requester({
    method: "POST",
    path: `/api/fridgePreset/${id}/addProduct`,
    body,
  });
};

API.prototype.removeProductsInOnePreset = function ({ id, body } = {}) {
  return this.requester({
    method: "DELETE",
    path: `/api/fridgePreset/${id}/removeProduct`,
    body,
  });
};

API.prototype.updateProductsInOnePreset = function ({ id, body } = {}) {
  return this.requester({
    method: "PUT",
    path: `/api/fridgePreset/${id}/editProduct`,
    body,
  });
};

API.prototype.removeOneProductInOnePreset = function ({
  id,
  idProduct,
  body,
} = {}) {
  return this.requester({
    method: "DELETE",
    path: `/api/fridgePreset/${id}/removeProduct/${idProduct}`,
    body,
  });
};

API.prototype.updateOneProductInOnePreset = function ({
  id,
  idProduct,
  body,
} = {}) {
  return this.requester({
    method: "PUT",
    path: `/api/fridgePreset/${id}/editProduct/${idProduct}`,
    body,
  });
};

// ---------- menu in preset ---------- //

API.prototype.getMenusInOnePreset = function ({ id } = {}) {
  return this.requester({
    method: "GET",
    path: `/api/fridgePreset/${id}/menus`,
  });
};

API.prototype.addMenusInOnePreset = function ({ id, body } = {}) {
  return this.requester({
    method: "POST",
    path: `/api/fridgePreset/${id}/addMenu`,
    body,
  });
};

API.prototype.removeMenusInOnePreset = function ({ id, body } = {}) {
  return this.requester({
    method: "DELETE",
    path: `/api/fridgePreset/${id}/removeMenu`,
    body,
  });
};

API.prototype.removeOneMenuInOnePreset = function ({ id, idMenu, body } = {}) {
  return this.requester({
    method: "DELETE",
    path: `/api/fridgePreset/${id}/removeMenu/${idMenu}`,
    body,
  });
};

API.prototype.updateOneMenuInOnePreset = function ({ id, idMenu, body } = {}) {
  return this.requester({
    method: "PUT",
    path: `/api/fridgePreset/${id}/editMenu/${idMenu}`,
    body,
  });
};

// ---------- users ---------- //


// export default new API({ url: process.env.API_HOST, fake: true });
export default new API({
  url: process.env.REACT_APP_API_URL,
});
