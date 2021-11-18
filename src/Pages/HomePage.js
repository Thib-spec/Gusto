import CheckboxForm from 'Components/FormComponent/CheckboxForm';
import { useHistory } from 'react-router';
import React, { Component, useState }  from 'react'

import DATACatégories from 'Data/categories';
import "CSS/test.css"
import 'react-dropdown/style.css';
import { useEffect } from 'react';




export default function HomePage(){


    

    let history=useHistory();

    function handleLogin(){
        history.push("/Login");
    }
    function handleProducts(){
        history.push("/Products");
    }
    function handleCategories(){
        history.push("/Categories");
    }
    


    
    return(
        <div className="">
           
        </div>
    )
}