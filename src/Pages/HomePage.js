import CheckboxForm from 'Components/FormComponent/CheckboxForm';
import { useHistory } from 'react-router';
import React, { Component, useState }  from 'react'

import DATACatégories from 'Data/categories';
import "CSS/test.css"
import 'react-dropdown/style.css';
import { useEffect } from 'react';

import {Modal, Button} from 'react-bootstrap'





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
    
    const [test, setTest] = useState(false);
    function handleTest(){
      
      setTest(true)
    }
    


    
    return(
        <div className="" onClick={()=>setTest(true) }>
          not ok

          {
            test?<div>ok</div>:<div>not ok</div>
          }
        </div>
 
        
    )
}