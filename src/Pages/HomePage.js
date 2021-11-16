import CheckboxForm from 'Components/FormComponent/CheckboxForm';
import { useHistory } from 'react-router';
import React, { Component }  from 'react'




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
       <div>
           <CheckboxForm/>
       </div>
    )
}