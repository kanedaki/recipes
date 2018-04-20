import React from 'react'
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'admin-on-rest'

export const RecipeIngrList = ({ record }) => {
    const { ingredients } = record
    return (
        <div>
            <label><b>Ingredients</b></label>
            <ul>
                { ingredients.map((el, i) => <li key={el.ingredient}>{el.ingredient}</li> )}
            </ul>
        </div>
    )
}