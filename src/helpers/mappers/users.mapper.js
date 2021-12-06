export default (el) => {
  return {
    id: el.user.id_user,
    firstName: el.user.firstname,
    lastName: el.user.lastname,
    language: el.user.user_language,
    id_client: el.user.fk_id_client,
    id_level: el.user.fk_id_level,
    client: { name: "Olivia" },
    level: { label: "admin" },
    ...el.user,
  };
};
