import React, { Component, useState, useEffect } from "react";

export default function FridgeProductCard({ product, parentProps }) {
  const [added, setAdded] = useState(
    parentProps.states.productsAdded.hasElById(product.id)
  );

  // const handleAddProduct = () => setAdded(!added);
  const handleAddProduct = () => {
    setAdded(!added);
    const productToAdd = { id: product.id, name: product.name, quantity: 0, min: 0, max: 0 }
    if (added) parentProps.states.productsAdded.removeMany([productToAdd]);
    else parentProps.states.productsAdded.addOrUpdateMany([productToAdd]);
  };

  return (
    <div className={`card productCard m-2`} key={product.id}>
      <div className="card-body p-5 text-center">
        <div className="">
          <img
            className="card-img-top"
            alt="Card image cap"
            src={product.image}
          />
        </div>
        <h5 class="card-title">{product.name}</h5>
        <hr className="my-2" />
        <div className="">
          <button
            onClick={handleAddProduct}
            type="submit"
            className={`btn ${added ? "btn-success" : "btn-dark blue"} m-1`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
