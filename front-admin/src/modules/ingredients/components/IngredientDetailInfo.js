import React from 'react'
import { IngredientFatAcidsInfo } from './IngredientFatAcidsInfo'
import { IngredientAminoacidsInfo } from './IngredientAminoacidsInfo'
import { IngredientCarbohydratesInfo } from './IngredientCarbohydratesInfo'

export const IngredientDetailInfo = ({ record }) => {
    const { detail } = record
    if (!detail) return null

    const { fatAcids, aminoacids, carbohydrates } = record.detail

    return (
        <div>
            <IngredientFatAcidsInfo fatAcidsInfo={fatAcids} label='Fat Acids'/>
            <IngredientAminoacidsInfo aminoacidsInfo={aminoacids} label='Aminoacids'/>
            <IngredientCarbohydratesInfo carbohydratesInfo={carbohydrates} label='Carbohydrates'/>
        </div>
    )
}