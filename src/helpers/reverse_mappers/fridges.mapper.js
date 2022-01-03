import StatusMapper from "./status.mapper";

const status = [
  { id: 1, message: "En production", inProduction: true },
  { id: 2, message: "Hors service", horsService: true },
  { id: 3, message: "Livraison en cours", livraison: true },
];

export default (el) => {
  return {
    id_fridge: el.id,
    label: el.name,
    fk_id_status: el.id_status,
    fk_id_technologie: el.id_technologies,
    // ...el,
  };
};
