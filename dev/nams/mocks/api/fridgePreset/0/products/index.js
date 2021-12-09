module.exports = (request, reply, next) => {
  const path = require("../../../product/index.json");
  return [
    {
      ...path[0],
      fridgePresets_products: { quantity_min: 300, quantity_max: 900 },
    },
    {
      ...path[1],
      fridgePresets_products: { quantity_min: 300, quantity_max: 900 },
    },
    {
      ...path[2],
      fridgePresets_products: { quantity_min: 300, quantity_max: 900 },
    },
    {
      ...path[3],
      fridgePresets_products: { quantity_min: 300, quantity_max: 900 },
    },
  ];
};
