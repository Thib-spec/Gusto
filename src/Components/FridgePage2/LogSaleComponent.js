import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LogSaleComponent({ sale }) {

  console.log(sale);
  let amount = sale.cbcless_amount+sale.cbemv_amount+sale.lv_quantity*sale.lv_amount

  function realPrice(prix){
    return(prix/100)
    
}

  return (
    <div className="logs-sales-content-element">
      <div className="logs-sales-date">{sale.sales_timestamp}</div>
      <div className="logs-sales-prix">
        {realPrice(amount)} €
      </div>
      <div className="logs-sales-content-element-products">
        {sale.Products.map((el) => (
          <div className="logs-sales-content-element-products-element" key={el.id_product}>
            <div>{el.label}</div>
            <div> x{el.products_sales.quantity_product}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
