import React from "react";
// import "CSS/colors.css";
import PageContext from "Context/PageContext";

/**
 * Composant d'un page afin qu'elle se ressemble toutes
 * utilisation pour les pages Login, FridgePreset, Fridge
 * possibilité d'ajouter un Loader si la page n'est pas prête a être chargé
 */

export default function Page({ children, contextValue, isLoading }) {
  console.log(isLoading)
  return (isLoading ? !isLoading : true) ? (
    <PageContext.Provider value={contextValue}>
      <>
        <div className={`container-fluid pt-5 h-100 pb-5`}>
          <div
            // className={`container h-100 justify-content-center ${
            className={`container h-100 justify-content-center d-flex flex-column align-items-center ${
              global.colorFull ? "blue" : ""
            }`}
          >
            {children}
          </div>
        </div>
      </>
    </PageContext.Provider>
  ) : (
    <>LOADER</> // Ajouter Loader 
  );
}
