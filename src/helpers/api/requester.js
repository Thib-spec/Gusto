const requester = (thiss) => {
  return (
    { method, path, body } = {
      method: "GET",
      path: "/",
      body: null,
    }
  ) => {
    return fetch(thiss.url + path, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization' : thiss.authToken instanceof String ? thiss.authToken : null,
        Authorization: localStorage.getItem("authToken"),
      },
      body: body instanceof Object ? JSON.stringify(body) : null,
    });
  };
};

export default requester;
