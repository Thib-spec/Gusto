import React, { useState, useContext, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import mappers from "helpers/mappers";
import api from "helpers/api";

import InfoContext from "Context/FridgeInfoContext";
import DropDownContext from "Context/FridgeDropDownComponentContext";
import Value from "helpers/Value";

export default function DropDownPresetChoose({ label }) {
  const { fridge, presetChosen } = useContext(InfoContext);
  const { allPresets } = useContext(DropDownContext);

  const dropdownTitleChange = new Value(useState(false));
  const handleSave = () => {};
  const handleCancel = () => {};

  useEffect(() => {
    const presetFound = allPresets.find(
      (preset) => preset.id == fridge.id_preset
    );
    presetChosen.set(presetFound ? { ...presetFound } : presetChosen.value);
  }, [allPresets]);

  useEffect(() => {
    if (
      presetChosen.value.id == fridge.id_preset ||
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
          {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
      {/* {console.log(loaded.value && dropdownTitleChange.value)} */}
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
