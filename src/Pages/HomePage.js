import React from 'react'
import "CSS/home.scss"
import 'react-dropdown/style.css';
import { useSelector} from "react-redux";

import {Modal, Button} from 'react-bootstrap'
import DropdownComponent from 'Components/DropDownComponent';
import Footer from 'Components/Footer';
import HeaderProfil from 'Components/HeaderProfil';
import PieChart from 'Components/ChartJSComponent/PieChart';
import LineChart from 'Components/ChartJSComponent/LineChart';
import BarChart from 'Components/ChartJSComponent/BarChart';
import Header from 'Components/Header';
import { useSelector, useDispatch } from "react-redux";
import userActions from "store/actions/user.actions";
import api from "helpers/api";
import TextAreaComponent from 'Components/FormComponent/TextAreaComponent';
import UploadContainer from 'Components/GestionPhoto/UploadContainer';





export default function HomePage(){

    const user = useSelector((state) => state.user.value);//On récupère le user
  
    return(
        <div className="m-5 h1">Welcome {user.firstName} {user.lastName}</div>
    )
}