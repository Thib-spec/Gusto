import React, { Component, useState, useEffect } from "react";
import Value from "helpers/Value";

export default function FridgeProductTableLine({ product }) {
  return (
    <tr>
      <td>{product.value.name}</td>
      <td>{product.value.quantity}</td>
      <td>{product.value.min}</td>
      <td>{product.value.max}</td>
      <td></td>
    </tr>
  );
}
