import React, { Component, useState, useEffect, useContext } from "react";
import Value from "helpers/Value";
import ProductsCardContext from "Context/ProductsCardContext";

export default function FridgeProductTableLine({ product }) {
  const handleProductChangeValue = (property) => (event) => {
    const body = {};
    body[property] = parseInt(event.target.value);
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
