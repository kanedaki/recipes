import React from 'react'
import { IngredientFatAcidsInfo } from './IngredientFatAcidsInfo'
import { IngredientAminoacidsInfo } from './IngredientAminoacidsInfo'
import { IngredientCarbohydratesInfo } from './IngredientCarbohydratesInfo'
import withCollapse from '../../hocs/withCollapse'

const IngredientDetailInfoRaw = ({ record }) => {
  const { detail } = record
  if (!detail) return null

  const { fatAcids, aminoacids, carbohydrates } = record.detail

  return (
    <div>
      <IngredientFatAcidsInfo fatAcidsInfo={fatAcids} label="Fat Acids" />
      <IngredientAminoacidsInfo aminoacidsInfo={aminoacids} label="Aminoacids" />
      <IngredientCarbohydratesInfo carbohydratesInfo={carbohydrates} label="Carbohydrates" />
    </div>
  )
}

export const IngredientDetailInfo = withCollapse(IngredientDetailInfoRaw)

IngredientDetailInfo.displayName = 'IngredientDetailInfo'

IngredientDetailInfo.defaultProps = {
  label: "Detailed information"
}