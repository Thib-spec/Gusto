module.exports = (request, reply, next) => {
  return { ...require("../get.json")[0], token: "bhsbfek" };
};
