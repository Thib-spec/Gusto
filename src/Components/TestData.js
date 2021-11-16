import DATACatégories from "../Data/categories"
import React, { Component, useState }  from 'react'

export default function TestData(){
    return(
        <div>
            {DATACatégories.dessert[0]}{DATACatégories.plat}
            
            


        </div>
    )
}