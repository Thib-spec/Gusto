import React, { Component, useState, useEffect } from "react";

export default function FridgeProductCard({ product, parentProps }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const productConfig = parentProps.states.products.get(product);
    if (productConfig.value) setAdded(true);
  }, []);

  const handleAddProduct = () => {
    const productConfig = parentProps.states.products.get(product);
    if (productConfig.value) {
      productConfig.remove();
    } else {
      const productToAdd = {
        id: product.id,
        name: product.name,
        min: 1,
        max: 1,
      };
      parentProps.states.products.addOrUpdateMany([productToAdd]);
    }
    setAdded(!added);
  };

  return (
    <div className={`card productCard m-2`} key={product.id}>
      <div className="card-body p-5 text-center">
        <div className="">
          <img className="card-img-top" alt="Image" src={product.image} />
        </div>
        <h5 className="card-title">{product.name}</h5>
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
