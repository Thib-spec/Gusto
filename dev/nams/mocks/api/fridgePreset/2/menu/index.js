module.exports = (request, reply, next) => {
  return [require("../menu")[0], require("../menu")[1], require("../menu")[2]];
};
