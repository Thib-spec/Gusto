import React, { Component, useState, useEffect } from "react";
import Value from "helpers/Value";

export default function FridgeProductTableLine({ product, parentProps }) {
  const removeProduct = () => {
    product.remove();
  };

  return (
    <tr>
      <td>{product.value.name}</td>
      <td>{product.value.quantity}</td>
    </tr>
  );
}
