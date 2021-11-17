import React, { Component, useState }  from 'react'


export default function InputForm(props){
    return(
      <div class="mb-3">
        
        <input type={props.type} class="form-control" id="formGroupExampleInput" placeholder={props.label} value={props.value}/>
      </div>
)
}