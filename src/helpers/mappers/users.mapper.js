import clientsMapper from "./clients.mapper";
import levelsMapper from "./levels.mapper";
import nationalitiesMapper from "./nationalities.mapper";

export default (el) => {
  return {
    id: el.id_user,
    firstName: el.firstname,
    lastName: el.lastname,
    language: nationalitiesMapper(el.Nationality).label,
    id_client: el.fk_id_client,
    id_level: el.fk_id_level,
    client: clientsMapper(el.Client),
    level: levelsMapper(el.Level),
    nationality: nationalitiesMapper(el.Nationality),
    // ...el,
  };
  console.log(clientsMapper(el.Client));
};
