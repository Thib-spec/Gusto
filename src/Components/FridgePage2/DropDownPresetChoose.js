import React, { useState, useContext, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import mappers from "helpers/mappers";
import api from "helpers/api";

import InfoContext from "Context/FridgeInfoContext";
import Value from "helpers/Value";

export default function DropDownPresetChoose({ label }) {
  const [allPresets, setAllPresets] = useState([]);
  const fridge = useContext(InfoContext);
  console.log("fridge : ", fridge);
  const presetChosen = new Value(useState({}));
  const dropdownTitleChange = new Value(useState(false));

  useEffect(() => {
    getAllPresets();
  }, []);

  useEffect(() => {
    if (presetChosen.value.id == fridge.id_preset)
      dropdownTitleChange.set(false);
    else dropdownTitleChange.set(true);
  }, [presetChosen.value]);

  async function getAllPresets() {
    try {
      const res = await api.getAllPresets();
      if (res.ok) {
        const resJSON = await res.json();
        const resJSONMapped = resJSON.map(mappers.presetsMapper);
        console.log("api.getAllPresets() : ", resJSON);
        setAllPresets(resJSONMapped);
        presetChosen.set(
          resJSONMapped.find((preset) => preset.id == fridge.id_preset)
            ? resJSONMapped.find((preset) => preset.id == fridge.id_preset)
            : "Choose a Preset"
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
      {dropdownTitleChange.value ? <div>wsh</div> : <></>}
    </>
  );
}
