import React from 'react'
import { IngredientMacroNutrient } from './IngredientMacroNutrient'

export const IngredientMacroInfo = ({ macroInfo }) => {
    const macroNames = Object.keys(macroInfo)
    return (
        <div>
            <h2>Macronutrients</h2>
            {macroNames.map(el => <IngredientMacroNutrient key={el} name={el} value={macroInfo[el].value} unit={macroInfo[el].unit}/>)}
        </div>
    )
}