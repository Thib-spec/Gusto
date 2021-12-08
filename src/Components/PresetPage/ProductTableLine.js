import React, { Component, useState, useEffect } from "react";
import Value from "helpers/Value";

export default function FridgeProductTableLine({ product, parentProps }) {
  const removed = new Value(useState(false));

  useEffect(() => {
    removed.set(product.value.min == 0 && product.value.max == 0);
  }, [product]);

  const handleProductChangeValue = (property) => (event) => {
    const body = {};
    body[property] = event.target.value;
    product.update(body);
  };

  const removeProduct = () => {
    product.remove();
  };

  return (
    <tr>
      <td>{product.value.name}</td>
      <td>
        <input
          className="w-100"
          type="number"
          onChange={handleProductChangeValue("min")}
          value={product.value.min}
        />
      </td>
      <td>
        <input
          className="w-100"
          type="number"
          onChange={handleProductChangeValue("max")}
          value={product.value.max}
        />
      </td>
      <td>
        <button
          onClick={removeProduct}
          type="submit"
          className="btn btn-danger red m-1"
        >
          X
        </button>
      </td>
    </tr>
  );
}
