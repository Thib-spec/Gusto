import React, { Component, useState, useEffect } from "react";


export default function FridgeProductCard({ product }) {

    const [added, setAdded] = useState(false)

    const handleAddProduct = () => setAdded(!added);

  return (
    <div className={`card productCard m-2`} key={product.id}>
      <div className="card-body p-5 text-center">
        <div className="">
          <img className="card-img-top" alt="Card image cap" src={product.image} />
        </div>
        <h5 class="card-title">{product.name}</h5>
        <hr className="my-2" />
        <div className="">
          <button
            onClick={handleAddProduct}
            type="submit"
            className={`btn ${added ? "btn-success" : "btn-dark blue" } m-1`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
