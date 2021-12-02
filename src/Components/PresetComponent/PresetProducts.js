import FridgeProductTableLine from "Components/FridgePage/FridgeProductTableLine";
import React, { Component, useState, useEffect } from "react";
import api from "helpers/api";
import ArrayController from "helpers/ArrayController";

export default function PresetProducts(){

//     // produits ajoutés dans le frigo
//   const products = new ArrayController(useState([]), useState([]));

//   useEffect(() => {
//     getProductsInFridge();
//   }, []);

//   // useEffect(() => {
//   //   console.log("products : ", products);
//   // }, [products.value]);

//   // appels api
  
  

//   // modal addProducts Button
//   const [show, setShow] = useState(false);
//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);
//   const handleAddProducts = handleShow;

//   // Save & Cancel
//   const handleSaveButton = () => {
//     addProductsInFridge();
//   };
//   const handleCancelButton = () => {
//     products.reset();
//   };

//   // ParentsProps
//   const parentProps = {
//     states: {
//       products,
//     },
//   };




    return(
        <div></div>
        
        // <div className="col m-1" style={{ "min-width": "400px" }}>
        //     <div class="card text-center h-100">
        //         <div class="card-header">name</div>
        //         <div class="card-body">
        //             <p class="card-text">
        //             <table class="table table-striped">
        //                 <thead>
        //                 <tr>
        //                     {/* <th>#</th> */}
        //                     <th>Product</th>
        //                     <th>Quantity</th>
        //                     <th>Min</th>
        //                     <th>Max</th>
        //                     <th></th>
        //                 </tr>
        //                 </thead>
        //                 <tbody>
        //                 {products.value.map((product) => {
        //                     return (
        //                     <FridgeProductTableLine
        //                         key={product.id}
        //                         product={products.get(product.id)}
        //                     />
        //                     );
        //                 })}
        //                 </tbody>
        //             </table>
        //             </p>
        //             <div className="row justify-content-center mb-2">
        //                 <div class="col m-1" align="center">
        //                     <button onClick={handleAddProducts} type="submit" className="btn btn-dark blue m-1">Add products</button>
        //                     <button onClick={() => {}} type="submit" className="btn btn-dark blue m-1"> passer une commande</button>
        //                 </div>
        //             </div>

        //             <div className="row justify-content-center">
        //                 <div class="col-6 m-1" align="center">
        //                     <button onClick={handleSaveButton} type="submit" className="btn btn-dark blue m-1">Save</button>
        //                     <button onClick={handleCancelButton} type="submit"className="btn btn-dark blue m-1">Cancel</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
       
    )
}