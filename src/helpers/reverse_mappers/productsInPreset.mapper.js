export default (el) => {
  return {
    id_product: el.id,
    label: el.name,
    quantity_max: el.max,
    quantity_min: el.min,
    // ...el,
  };
};
