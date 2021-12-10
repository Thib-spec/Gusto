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
    console.log("AAAAAAAAAAAAAA : ", authToken);
    console.log("FFFFFFFFFFFFF : ", authToken instanceof String);
    console.log("GGGGGGGGGGGG : ", typeof authToken);
    if (typeof authToken == "string") {
      console.log("BBBBBBBBBBB : ");
      options.headers["Authorization"] = `Bearer ${authToken}`;
    }
    // options.headers["Authorization"] = localStorage.getItem("authToken");

    if (body instanceof Object) options["body"] = JSON.stringify(body);

    // fetch(thiss.url + path, options).then(res=>res.json()).then((resJSON)=>{
    //   console.log("requete : ", thiss.url + path, resJSON);
    // })
    return fetch(thiss.url + path, options);
  };
};

export default requester;
