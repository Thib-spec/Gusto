import React, { useState, useContext, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import mappers from "helpers/mappers";
import api from "helpers/api";

import PageContext from "Context/PageContext";
import DropDownComponentContext from "Context/DropDownComponentContext";
import Value from "helpers/Value";
import useFridgePreset from "./useFridgePreset";

export default function DropDownPresetChoose({ label }) {
  const { fridge, presetChosen } = useContext(DropDownComponentContext);
  const { allPresets } = useContext(PageContext);

  const [fridgeC, setFridgeC] = useState({ ...fridge });

  const dropdownTitleChange = new Value(useState, false);

  const handleSave = async () => {
    try {
      const body = { fk_id_fridgePreset: presetChosen.value.id };
      const res = await api.updateOneFridge({ id: fridgeC.id, body });
      if (res.ok) {
        const resJSON = await res.json();
        console.log("api.updateOneFridge() : ", resJSON);
        presetChosen.set({ ...presetChosen.value }, { init: true });
        console.log("fridgeC", fridgeC);
        setFridgeC({ ...fridgeC, id_preset: presetChosen.value.id });
        dropdownTitleChange.set(false);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    presetChosen.reset();
  };

  // useEffect(() => {
  //   const presetFound = allPresets.find(
  //     (preset) => preset.id == fridgeC.id_preset
  //   );
  //   presetChosen.set(presetFound ? { ...presetFound } : presetChosen.value, {
  //     init: true,
  //   });
  // }, [allPresets, fridgeC]);

  useEffect(() => {
    if (
      presetChosen.value.id == fridgeC.id_preset ||
      presetChosen.value.id == -1
    )
      dropdownTitleChange.set(false);
    else dropdownTitleChange.set(true);
  }, [presetChosen.value]);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {presetChosen.value.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {allPresets.map((preset) => {
            return (
              <Dropdown.Item
                onClick={() => {
                  presetChosen.set(preset);
                }}
                key={preset.id}
              >
                {preset.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      {dropdownTitleChange.value ? (
        <div>
          <button
            onClick={handleSave}
            type="submit"
            className={`btn btn-success m-1`}
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            type="submit"
            className={`btn btn-dark blue m-1`}
          >
            Cancel
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
