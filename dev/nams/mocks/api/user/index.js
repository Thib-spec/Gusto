module.exports = (req, res, next) => {
  const method = req.request.raw.method;
  const body = req.request.body;
  if (method == "POST") {
    return { ...require("./post.json") };
  } else return { ...require("./get.json") };
};
