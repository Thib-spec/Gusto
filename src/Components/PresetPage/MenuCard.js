import React, { Component, useState, useEffect, useContext } from "react";
import MenusCardContext from "Context/MenusCardContext";

export default function FridgeMenuCard({ menu }) {
  const [added, setAdded] = useState(false);
  const { menus } = useContext(MenusCardContext);
  const productToShow = menus.get(menu);

  useEffect(() => {
    const menuToShow = menus.get(menu);
    if (menuToShow.value) setAdded(true);
  }, []);

  const handleAddMenu = () => {
    const menuToShow = menus.get(menu);
    if (menuToShow.value) {
      menuToShow.remove();
    } else {
      const menuToAdd = {
        id: menu.id,
        name: menu.name,
      };
      menus.addOrUpdateMany([menuToAdd]);
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
