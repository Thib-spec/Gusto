import React, { Component, useState, useEffect } from "react";
import Value from "helpers/Value";

export default function FridgeMenuTableLine({ menu }) {
  return (
    <tr>
      <td>{menu.value.name}</td>
      <td></td>
    </tr>
  );
}
