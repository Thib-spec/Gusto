import "CSS/FormComponent.scss"
import React, { Component, useState }  from 'react'

export default function CheckboxForm(){
  return(
    <div className="checkboxForm-container">
        <input className="checkboxForm-container-input" type="checkbox" id=""/>
        <label className="checkboxForm-container-label" for="gridCheck">
          <div className="d-flex flex-column">
            <div>Nouvelle</div>
            <div>catégorie</div>
          </div>
        </label>
    </div>
)
}