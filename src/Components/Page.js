import React, { Component, useState } from "react";
// import "CSS/colors.css";
import PageContext from "Context/PageContext";

export default function Page({ children, contextValue, isLoading }) {
  return (isLoading ? !isLoading.value : true) ? (
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
    <></>
  );
}
