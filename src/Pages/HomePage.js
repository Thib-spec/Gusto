import React from 'react'
import "CSS/home.scss"
import 'react-dropdown/style.css';


import { useSelector, useDispatch } from "react-redux";






export default function HomePage(){

    const user = useSelector((state) => state.user.value);//On récupère le user
  
    return(
        <div className="m-5 h1">Welcome {user.firstName} {user.lastName}</div>
    )
}