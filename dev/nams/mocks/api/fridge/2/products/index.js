module.exports = (request, reply, next) => {
  const productsPath = require("../../../product/index.json");
  return {
    ...require("../index.json"),
    Products: [
      {
        ...productsPath[0],
        fridges_products: {
          id_fridges_products: 1,
          quantity: 23,
          createdAt: "2021-12-06T13:31:45.000Z",
          updatedAt: "2021-12-06T13:31:45.000Z",
          fk_id_fridge: 1,
          fk_id_product: 1,
        },
      },
      {
        ...productsPath[1],
        fridges_products: {
          id_fridges_products: 1,
          quantity: 23,
          createdAt: "2021-12-06T13:31:45.000Z",
          updatedAt: "2021-12-06T13:31:45.000Z",
          fk_id_fridge: 1,
          fk_id_product: 1,
        },
      },
      {
        ...productsPath[2],
        fridges_products: {
          id_fridges_products: 1,
          quantity: 23,
          createdAt: "2021-12-06T13:31:45.000Z",
          updatedAt: "2021-12-06T13:31:45.000Z",
          fk_id_fridge: 1,
          fk_id_product: 1,
        },
      },
    ],
  };
};
