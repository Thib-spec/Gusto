export default (el) => {
  return {
    id: el.id_client,
    name: el.label,
    ...el,
  };
};
