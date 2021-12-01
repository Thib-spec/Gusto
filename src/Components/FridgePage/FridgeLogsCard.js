import DATASales from "Data/dataSales";
import React, { useState } from "react";
import "../../CSS/logsFridge.scss"
import ButtonFridge from "../FridgePage/ButtonFridge"

export default function FridgeLogsCard({name}){

    const[logFridge,setLogFridge] = useState(false)
    const[logSales,setLogSales]= useState(true)
    
    function handleSales(){
        setLogFridge(false)
        setLogSales(true)
    }
    function handleFridges(){
        setLogFridge(true)
        setLogSales(false)
    }


    return(
        <div className="col m-1" style={{ "min-width": "400px" }}>
            <div class="card text-center h-100">
                <div class="card-header">{name}</div>
                <div class="card-body">
                    <div className="logs-onglets">
                        {logSales?<div className="logs-onglets-element" id="selected">Logs des ventes</div>:<div className="logs-onglets-element" onClick={()=>handleSales()}>Logs des ventes</div>} 
                        {logFridge?<div className="logs-onglets-element" id="selected">Logs du frigo</div>:<div className="logs-onglets-element" onClick={()=>handleFridges()}>Logs du frigo</div>}
                    </div>
                    <div className="container-logs"> 
                        <div>
                            {logFridge?
                                <div className="containerLogFridge">
                                    <div className="logs-title">
                                        <div className="logs-fridge-date">Date</div>
                                        <div className="logs-fridge-code">Code</div>
                                    </div>
                                </div>
                            :false
                            }
                            {logSales?
                                <div className="containerLogSales">
                                    <div className="logs-title">
                                        <div className="logs-sales-date">Date</div>
                                        <div className="logs-sales-prix">Prix</div>
                                        <div className="logs-sales-produits">Produits</div>
                                    </div>
                                    <div className="logs-sales-content">
                                        {DATASales.map((sale)=>
                                            <div>
                                                {
                                                    sale.fk_id_fridge==1?
                                                        <div className="logs-sales-content-element">
                                                            <div className="logs-sales-date">{sale.sales_timestamp}</div>
                                                            <div className="logs-sales-prix">{5}</div>
                                                            <div className="logs-sales-content-element-products">
                                                                <div className="logs-sales-content-element-products-element">
                                                                    <div>pâtes</div>
                                                                    <div>x1</div>
                                                                </div>
                                                                <div className="logs-sales-content-element-products-element">
                                                                    <div>coca</div>
                                                                    <div>x2</div>
                                                                </div>                                                                  
                                                            </div>
                                                        </div>
                                                    :false
                                                }
                                                
                                            </div>
                                        )}
                                    </div>
                                </div>
                            :false
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>



    )
}