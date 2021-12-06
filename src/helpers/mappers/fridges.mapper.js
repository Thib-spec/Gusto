const status = [
  { id: 1, message: "En production", inProduction: true },
  { id: 2, message: "Hors service", horsService: true },
  { id: 3, message: "Livraison en cours", livraison: true },
];

export default (el) => {
  return {
    id: el.id_fridge,
    name: el.label,
    id_status: el.fk_id_status,
    status: status.find((status) => status.id == el.fk_id_status),
    id_technologie: el.fk_id_technologies,
    ...el,
  };
};
