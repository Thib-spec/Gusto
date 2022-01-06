import React, { Component, useState, useEffect } from "react";
import Value from "helpers/Value";

export default function FridgeProductTableLine({ product, parentProps }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.quantity ? product.quantity : 0}</td>
      <td>{product.min}</td>
      <td>{product.max}</td>
    </tr>
  );
}
