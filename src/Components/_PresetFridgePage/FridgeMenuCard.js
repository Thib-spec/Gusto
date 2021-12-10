import React, { Component, useState, useEffect } from "react";

export default function FridgeMenuCard({ menu, parentProps }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const menuConfig = parentProps.states.menus.findElById(menu.id);
    if (menuConfig) setAdded(true);
  }, []);

  const handleAddMenu = () => {
    const MenuConfig = parentProps.states.menus.get(menu.id);
    if (MenuConfig.value) {
      if (added) {
        MenuConfig.remove();
      }
    } else {
      const menuToAdd = {
        id: menu.id,
        name: menu.name,
      };
      parentProps.states.menus.addOrUpdateMany([menuToAdd]);
    }
    setAdded(!added);
  };

  return (
    <div className={`card productCard m-2`} key={menu.id}>
      <div className="card-body p-5 text-center">
        <div className="">
          <img className="card-img-top" alt="Image" src={menu.image} />
        </div>
        <h5 className="card-title">{menu.name}</h5>
        <hr className="my-2" />
        <div className="">
          <button
            onClick={handleAddMenu}
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
