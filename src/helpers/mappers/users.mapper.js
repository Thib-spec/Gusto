import clientsMapper from "./clients.mapper";
import levelsMapper from "./levels.mapper";
import nationalitiesMapper from "./nationalities.mapper";

export default (el) => {
  return {
    id: el.id_user,
    email: el.email,
    firstName: el.firstname,
    lastName: el.lastname,
    language: el.Nationality
      ? nationalitiesMapper(el.Nationality).label
      : nationalitiesMapper({ fk_id_nationality: el.fk_id_nationality }).label,
    id_client: el.fk_id_client,
    id_level: el.fk_id_level,
    id_nationality: el.fk_id_nationality,
    client: el.Client
      ? clientsMapper(el.Client)
      : clientsMapper({ fk_id_client: el.fk_id_client }),
    level: el.Level
      ? levelsMapper(el.Level)
      : levelsMapper({ fk_id_level: el.fk_id_level }),
    nationality: el.Nationality
      ? nationalitiesMapper(el.Nationality)
      : nationalitiesMapper({ fk_id_nationality: el.fk_id_nationality }),
    // ...el,
  };
};
