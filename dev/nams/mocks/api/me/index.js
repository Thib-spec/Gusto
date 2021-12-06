module.exports = (request, reply, next) => {
  return require("../user/get.json")[0];
};
