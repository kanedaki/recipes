import React from 'react'
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
    return (
        <div>
            <FieldArray name={'ingredients'} component={renderMember}/>
        </div>
    )
}