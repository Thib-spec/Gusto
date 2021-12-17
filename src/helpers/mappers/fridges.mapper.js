import StatusMapper from "./status.mapper";

export default (el) => {
  return {
    id: el.id_fridge,
    name: el.label,
    id_status: el.states[0] ? el.states[0].id_state : undefined,
    status: StatusMapper({
      fk_id_status: el.states[0] ? el.states[0].id_state : undefined,
    }),
    id_technologie: el.fk_id_technologies,
    id_preset: el.fk_id_fridgePreset,
    // ...el,
  };
};
