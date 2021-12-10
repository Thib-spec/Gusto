export default (el) => {
  return {
    id_product: el.id,
    label: el.name,
    image: el.image,
    // ...el,
  };
};
