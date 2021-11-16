import React, { Component, useState }  from 'react'

export default function SelectForm(props){
    return(
        <select class="form-select" aria-label="Default select example">
            <option selected disabled="true">Catégories</option>
            <option value="1">{props.one}</option>
            <option value="2">{props.two}</option>
            <option value="3">{props.three}</option>
        </select>
)
}