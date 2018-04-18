import React from 'react'
import { IngredientCaloriesInfo } from './IngredientCaloriesInfo'
import { IngredientMacroInfo } from './IngredientMacroInfo'

export const IngredientGeneralInfo = ({ record }) => {
    const { value, unit } = record.general.calories
    const { macro } = record.general
    return (
        <div>
            <IngredientCaloriesInfo value={value} unit={unit} />
            <IngredientMacroInfo macroInfo={macro} />
        </div>
    )
}