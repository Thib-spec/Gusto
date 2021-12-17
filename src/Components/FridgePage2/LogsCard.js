import DATASales from "Data/dataSales";
import React, { useState, useEffect } from "react";
import "../../CSS/logsFridge.scss";
import ButtonFridge from "./ButtonFridge";
import axios from "axios";
import LogSaleComponent from "./LogSaleComponent";
import DATAfridgeproduct from "Data/datafridgeproduct";

export default function FridgeLogsCard(props) {
  const [sliceSales, setsliceSales] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://api.gustosolutions.fr/api/fridge/" +
          props.idFridge +
          "/sales/products"
      )
      .then((res) => {
        setsliceSales(typeof res.data == "array" ? res.data : []);
      })
      .catch((err) => console.log(err));
  }, []);

  const [logFridge, setLogFridge] = useState(false);
  const [logSales, setLogSales] = useState(true);

  function handleSales() {
    setLogFridge(false);
    setLogSales(true);
  }
  function handleFridges() {
    setLogFridge(true);
    setLogSales(false);
  }

  return (
    <div className="col m-1" style={{ minWidth: "400px" }}>
      <div className="card text-center h-100">
        <div className="card-header">{props.name}</div>
        <div className="card-body">
          <div className="logs-onglets">
            {logSales ? (
              <div className="logs-onglets-element" id="selected">
                Logs des ventes
              </div>
            ) : (
              <div
                className="logs-onglets-element"
                onClick={() => handleSales()}
              >
                Logs des ventes
              </div>
            )}
            {logFridge ? (
              <div className="logs-onglets-element" id="selected">
                Logs du frigo
              </div>
            ) : (
              <div
                className="logs-onglets-element"
                onClick={() => handleFridges()}
              >
                Logs du frigo
              </div>
            )}
          </div>
          <div className="container-logs">
            <div>
              {logFridge ? (
                <div className="containerLogFridge">
                  <div className="logs-title">
                    <div className="logs-fridge-date">Date</div>
                    <div className="logs-fridge-code">Code</div>
                  </div>
                </div>
              ) : (
                false
              )}
              {logSales ? (
                <div className="containerLogSales">
                  <div className="logs-title">
                    <div className="logs-sales-date">Horodatage</div>
                    <div className="logs-sales-produits">Panier</div>
                    <div className="logs-sales-prix">Montants</div>
                  </div>

                  <div className="logs-sales-content">
                    {sliceSales.map((sale) => (
                      <div key={sale.id_sale}>
                        {console.log(sale)}
                        {sale.fk_id_fridge == props.idFridge ? ( //peut être enlever??
                          <LogSaleComponent sale={sale} />
                        ) : (
                          false
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                false
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
