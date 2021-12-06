export default (el) => {
  return {
    id: el.id_product,
    name: el.label,
    ...el,
  };
};
