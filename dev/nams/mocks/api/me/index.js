module.exports = (request, reply, next) => {
  return require("../user/index.json")[0];
};
