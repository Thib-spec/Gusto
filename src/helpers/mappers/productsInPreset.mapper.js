export default (el) => {
  return {
    id: el.fk_id_product,
    name: el.label,
    max: el.fridgePresets_products
      ? el.fridgePresets_products.quantity_max
      : undefined,
    min: el.fridgePresets_products
      ? el.fridgePresets_products.quantity_min
      : undefined,
    // ...el,
  };
};
