import StatusMapper from "./status.mapper";

export default (el) => {
  return {
    id: el.id_fridge,
    name: el.label,
    id_status: el.fk_id_status,
    status: StatusMapper({ id: el.fk_id_status }),
    id_technologie: el.fk_id_technologies,
    id_preset: el.fk_id_fridgePreset,
    // ...el,
  };
};
