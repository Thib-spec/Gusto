import Value from "helpers/Value";
import { useState, useEffect } from "react";

export default function useFridgePreset(presetId, allPresets) {
  const found = allPresets.find((preset) => preset.id == presetId);
  console.log(found);
  const preset = new Value(
    useState,
    found ? found : { id: -1, name: "Choose a Preset" }
  );

  useEffect(() => {}, []);

  return preset;
}
