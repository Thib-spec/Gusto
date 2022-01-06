const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const rewriter = jsonServer.rewriter(
  require(path.join(__dirname, "routes.json"))
);
const env = require(path.join(__dirname, "env.json"));

const middlewares = jsonServer.defaults();

const PORT = process.env.MOCK_API_PORT ||4000;

server.use(middlewares);
server.use([
  (req, res, next) => {
    if (req.url == env.LOGIN_URL && req.method == "POST") {
      console.log(req);
      return res.status(401).json({
        test: "test",
      });
    }
    return next();
  },
]);
server.use(rewriter);
server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
