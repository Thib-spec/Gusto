import React, {Component, useState }  from 'react'
import "CSS/colors.css";


export default function Page({children}){
    return(
        <>
      <div className={`container-fluid vh-100 grey`}>
        <div className={`container-fluid h-100 pt-5 ${global.colorFull ? "red" : ""}`}>
          <div className={`row h-100 justify-content-center ${global.colorFull ? "blue" : ""}`}>
            {/* <div className={`h-100 col-12 col-md-9 col-lg-8 col-xl-7 ${global.colorFull ? "yellow" : ""}`}> */}
            {/* <div className={`h-100 col-11 justify-content-center d-flex flex-column ${global.colorFull ? "yellow" : ""}`}> */}
            <div className={`h-100 col-11 ${global.colorFull ? "yellow" : ""}`}>
                <div className={`row h-100 justify-content-center ${global.colorFull ? "blueviolet" : ""}`}>
                    {children}
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}