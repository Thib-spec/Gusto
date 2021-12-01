import CheckboxForm from 'Components/FormComponent/CheckboxForm';
import { useHistory } from 'react-router';
import React, { Component, useState }  from 'react'

import DATACatégories from 'Data/categories';
import "CSS/home.scss"
import 'react-dropdown/style.css';
import { useEffect } from 'react';

import {Modal, Button} from 'react-bootstrap'
import DropdownComponent from 'Components/DropDownComponent';
import Footer from 'Components/Footer';
import HeaderProfil from 'Components/HeaderProfil';
import PieChart from 'Components/ChartJSComponent/PieChart';
import LineChart from 'Components/ChartJSComponent/LineChart';
import BarChart from 'Components/ChartJSComponent/BarChart';





export default function HomePage(){
    
    return(
        <div className="container-home">
            <div className="home-logs">
                <div className="home-log-left">
                    <div className="home-logs-header">
                        header1
                    </div>
                    <div className="home-logs-content">
                        <div className="home-logs-content-labels">
                            <div className="home-logs-content-labels-left">element1</div>
                            <div className="">element2</div>
                            <div className="home-logs-content-labels-right">element3</div>
                        </div>
                        <div className="home-logs-content-data">
    
                        </div>
                    </div>
                </div>
                <div className="home-log-right">
                    <div className="home-logs-header">
                        header2
                    </div>
                    <div className="home-logs-content">
                        <div className="home-logs-content-labels">
                            <div className="home-logs-content-labels-left">element1</div>
                            <div className="home-logs-content-labels-right">element2</div>
                        </div>
                        <div className="home-logs-content-data">

                        </div>
                    </div>
                </div>
            </div>
            <div className="home-graphs">
                graphs
            </div>
        </div>
 
        
    )
}