module.exports = (request, reply, next) => {
  const path = require("../../../product/index.json");
  return {
    Products: [
      {
        ...path[6],
        fridgePresets_products: { quantity_min: 300, quantity_max: 900 },
      },
      {
        ...path[4],
        fridgePresets_products: { quantity_min: 300, quantity_max: 900 },
      },
      {
        ...path[8],
        fridgePresets_products: { quantity_min: 300, quantity_max: 900 },
      },
    ],
  };
};
