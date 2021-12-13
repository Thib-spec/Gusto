const Path = require("path");

const requester = (thiss) => {
  return (
    { method, path, body } = {
      method: "GET",
      path: "/",
      body: null,
    }
  ) => {
    // console.log("requete : ", thiss.url + path);
    const options = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const authToken = localStorage.getItem("authToken");
    if (typeof authToken == "string") {
      options.headers["Authorization"] = `Bearer ${authToken}`;
    }

    if (body instanceof Object) {
      console.log("BODY : ", JSON.stringify(body));
      options["body"] = JSON.stringify(body);
    }

    return fetch(thiss.url + path, options);
  };
};

export default requester;
