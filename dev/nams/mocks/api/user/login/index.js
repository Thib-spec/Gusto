module.exports = (request, reply, next) => {
  return { user: { ...require("../get.json")[0] }, token: "bhsbfek" };
};
