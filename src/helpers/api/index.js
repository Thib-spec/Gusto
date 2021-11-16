import { ip } from "./config.js";
import requester from "./requester";

import loginData from "./fakeData/login";
import logoutData from "./fakeData/logout";
import getInfoData from "./fakeData/getInfo";

const API = function ({ url, authToken, fake }) {
  this.fake = fake == undefined ? true : fake;
  this.url = this.url
    ? url
    : this.fake
    ? "https://jsonplaceholder.typicode.com"
    : ip;
  this.authToken = authToken ? authToken : null;
  this.requester = requester(this);
};

// ---------- auth ---------- //

API.prototype.login = async function ({ body } = {}) {
  if (this.fake) return loginData;
  return await this.requester({
    method: "POST",
    path: "/auth/login",
    body,
  });
};

API.prototype.logout = async function ({ err } = {}) {
  if (this.fake) return logoutData;
  // if (this.fake & !err) return require("helpers/api/fakeData/logout.json");
  // else if (this.fake & err)
  //   return require("helpers/api/fakeData/logout_err.json");
  const res = await this.requester({ method: "GET", path: "/auth/logout" });
  return res;
};

API.prototype.getInfo = async function ({ body } = {}) {
  if (this.fake) return getInfoData;
  const res = await this.requester({ method: "GET", path: "/me/info", body });
  return res;
};

// ---------- users ---------- //

API.prototype.getUsers = async function ({}) {
  const res = await this.requester({ method: "GET", path: "/users" });
  return res;
};

API.prototype.createUser = async function ({ body }) {
  if (this.fake)
    return {
      success: 1,
      userCreated: {
        id: 1,
        username: "luky",
        phoneNumber: "0607080910",
      },
      token: "bhsbhjs",
    };
  const res = await this.requester({ method: "POST", path: "/users", body });
  return res;
};

API.prototype.getOneUser = async function ({ id }) {
  const res = await this.requester({ method: "GET", path: `/users/${id}` });
  return res;
};

API.prototype.updateOneUser = async function ({ id, body }) {
  const res = await this.requester({
    method: "POST",
    path: `/users/${id}`,
    body,
  });
  return res;
};

API.prototype.deleteOneUser = async function ({ id }) {
  const res = await this.requester({ method: "DELETE", path: `/users/${id}` });
  return res;
};

export default new API({ fake: true });
