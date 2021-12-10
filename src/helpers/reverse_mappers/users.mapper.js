import clientsMapper from "./clients.mapper";
import levelsMapper from "./levels.mapper";
import nationalitiesMapper from "./nationalities.mapper";

export default (el) => {
  return {
    id: el.id_user,
    firstName: el.firstname,
    lastName: el.lastname,
    fk_id_client: el.id_client,
    fk_id_level: el.id_level,
    fk_id_nationality: el.id_nationality,
    Client: clientsMapper(el.client),
    Level: levelsMapper(el.level),
    Nationality: nationalitiesMapper(el.nationality),
    // ...el,
  };
  console.log(clientsMapper(el.Client));
};
