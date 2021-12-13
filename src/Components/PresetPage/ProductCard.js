import React, { Component, useState, useEffect, useContext } from "react";
import ProductsCardContext from "Context/ProductsCardContext";

export default function FridgeProductCard({ product, parentProps }) {
  const [added, setAdded] = useState(false);
  const { products } = useContext(ProductsCardContext);
  const productToShow = products.get(product);

  useEffect(() => {
    if (productToShow.value) setAdded(true);
  }, []);

  const handleAddProduct = () => {
    if (productToShow.value) {
      productToShow.remove();
    } else {
      const productToAdd = {
        id: product.id,
        name: product.name,
        min: 1,
        max: 1,
      };
      products.addOrUpdateMany([productToAdd]);
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
