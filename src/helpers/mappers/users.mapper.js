export default (el) => {
  return {
    id: el.id_user,
    firstName: el.firstname,
    lastName: el.lastname,
    language: el.user_language,
    id_client: el.fk_id_client,
    id_level: el.fk_id_level,
    client: { name: "Olivia" },
    level: { label: "admin" },
    ...el,
  };
};
