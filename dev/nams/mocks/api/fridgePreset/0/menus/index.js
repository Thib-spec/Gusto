module.exports = (request, reply, next) => {
  return [
    require("../../../menu/index.json")[0],
    require("../../../menu/index.json")[1],
  ];
};
