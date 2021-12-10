export default (el) => {
  return {
    id: el.id_product,
    name: el.label,
    quantity: el.fridges_products.quantity,
    // max: el.FridgePresets[0].fridgePresets_products.quantity_max,
    // min: el.FridgePresets[0].fridgePresets_products.quantity_min,
    // ...el,
  };
};
