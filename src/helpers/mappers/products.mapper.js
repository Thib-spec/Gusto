export default (el) => {
  return {
    id: el.id_product,
    name: el.label,
    image: el.image,
    // ...el,
  };
};
