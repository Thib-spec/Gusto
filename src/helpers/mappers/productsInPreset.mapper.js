export default (el) => {
  return {
    id: el.id_product,
    name: el.label,
    max: el.fridgePresets_products.quantity_max,
    min: el.fridgePresets_products.quantity_min,
    // ...el,
  };
};
