import React from 'react'
import { List, Datagrid, TextField, EditButton, DeleteButton, ReferenceInput, AutocompleteInput } from 'admin-on-rest'
import { FieldArray } from 'redux-form'

const renderMember = ({ fields }) => {
    return (
        <div>
            <label><b>Ingredients</b></label>
            <ul>
                { fields.getAll().map((el, i) => {
                    return <li key={el.ingredient}>{el.ingredient}</li> 
                })}
            </ul> 
            <button type="button" onClick={() => fields.push({ingredient: 'Hola'})}>Add Ingredient</button>
        </div>
    )
}

export const RecipeIngrList = ({ record }) => {
    const { ingredients } = record
    return (
        <div>
            <FieldArray name={'ingredients'} component={renderMember}/>
        </div>
    )
}