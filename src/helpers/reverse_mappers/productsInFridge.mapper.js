export default (el) => {
  return {
    id_product: el.id,
    label: el.name,
    quantity_max: parseInt(el.max),
    quantity_min: parseInt(el.min),
    // ...el,
  };
};
