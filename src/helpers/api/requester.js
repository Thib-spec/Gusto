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
    if (thiss.authToken instanceof String)
      options.headers["Authorization"] = thiss.authToken;
    // options.headers["Authorization"] = localStorage.getItem("authToken");

    if (body instanceof Object) options["body"] = JSON.stringify(body);

    // fetch(thiss.url + path, options).then(res=>res.json()).then((resJSON)=>{
    //   console.log("requete : ", thiss.url + path, resJSON);
    // })
    return fetch(thiss.url + path, options);
  };
};

export default requester;
