export default (el) => {
  return {
    id: el.fk_id_menu,
    name: el.web_label,
    image: el.image,
    // ...el,
  };
};
