module.exports = (request, reply, next) => {
  const path = require("../../../product/index.json");
  return {
    Products: [
      {
        ...path[5],
        fridgePresets_products: { quantity_min: 300, quantity_max: 900 },
      },
      {
        ...path[1],
        fridgePresets_products: { quantity_min: 300, quantity_max: 900 },
      },
      {
        ...path[9],
        fridgePresets_products: { quantity_min: 300, quantity_max: 900 },
      },
    ],
  };
};
