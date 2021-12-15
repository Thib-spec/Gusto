module.exports = (request, reply, next) => {
  return [require("../../../menu/index.json")[2]];
};
