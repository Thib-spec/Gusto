import React, { Component, useState, useEffect } from "react";
import Value from "helpers/Value";

export default function FridgeMenuTableLine({ menu }) {
  const removeMenu = () => {
    menu.remove();
  };

  return (
    <tr>
      <td>{menu.value.name}</td>
      <td>
        <button
          onClick={removeMenu}
          type="submit"
          className="btn btn-danger red m-1"
        >
          X
        </button>
      </td>
    </tr>
  );
}
