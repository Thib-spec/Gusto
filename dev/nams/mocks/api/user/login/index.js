module.exports = (request, reply, next) => {
  return { ...require("../index.json")[0], token: "bhsbfek" };
};
