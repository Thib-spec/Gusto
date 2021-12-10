module.exports = (request, reply, next) => {
  return [
    require("./0/index.json"),
    require("./1/index.json"),
    require("./2/index.json"),
  ];
};
