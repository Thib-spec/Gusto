import React, {Component, useState }  from 'react'
// import "CSS/colors.css";


export default function Page({children}){
    return (
      <>
        <div className={`container-fluid pt-5 h-100 grey pb-5`}>
          <div
            className={`container h-100 justify-content-center ${
              global.colorFull ? "blue" : ""
            }`}
          >
            {children}
          </div>
        </div>
      </>
    );
}