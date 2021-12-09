import React, { useState,useEffect } from "react";
import axios from "axios"


export default function LogSaleComponent({sale}){

    console.log(sale)


    return(
        <div className="logs-sales-content-element">
            <div className="logs-sales-date">{sale.sales_timestamp}</div>
            <div className="logs-sales-prix">{sale.cbcless_amount}+{sale.cbemv_amount}</div>
            <div className="logs-sales-content-element-products">
                {
                    sale.Products.map((el)=>
                    <div className="logs-sales-content-element-products-element">
                        <div>{el.label}</div>
                        <div>x{el.products_sales.quantity_product}</div>    
                   </div>
                    )
                }
                                                                             
            </div>
        </div>

    )
}


