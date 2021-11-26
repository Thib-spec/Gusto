import React, { useState } from "react";
import "../../CSS/logsFridge.scss"
import ButtonFridge from "../FridgePage/ButtonFridge"

export default function FridgeLogsCard({name}){

    const[logFridge,setLogFridge] = useState(false)
    const[logSales,setLogSales]= useState(false)

    return(
        <div className="col m-1" style={{ "min-width": "400px" }}>
            <div class="card text-center h-100">
                <div class="card-header">{name}</div>
                <div class="card-body">
                    <div className="container-logs">
                        {
                            (logFridge ===false) && (logSales==false)?
                                <div>
                                    <div className="log-list-element">
                                        <div onClick={()=>setLogFridge(true)} className="log-list-element-element button-log"><ButtonFridge label="Logs du frigo"/></div>
                                    </div>
                                    <div className="log-list-element">
                                        <div onClick={()=>setLogSales(true)} className="log-list-element-element button-log"><ButtonFridge label="Logs des ventes"/></div>
                                    </div>
                                </div>
                            :
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
                                        </div>
                                    :false
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>



    )
}