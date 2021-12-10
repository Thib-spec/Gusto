import React, { Component, useState, useEffect } from "react";
import Value from "helpers/Value";

export default function FridgeMenuTableLine({ menu, parentProps }) {
  const removeMenu = () => {
    menu.remove();
  };

  return (
    <tr>
      <td>{menu.value.name}</td>
    </tr>
  );
}
