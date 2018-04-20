import React from 'react'
import { IngredientCaloriesInfo } from './IngredientCaloriesInfo'
import { IngredientMacroInfo } from './IngredientMacroInfo'
import { IngredientMicroInfo } from './IngredientMicroInfo'
import withCollapse from '../../hocs/withCollapse'

const IngredientGeneralInfoRaw = ({ record }) => {
  const { general } = record
  if (!general) return null
  const { value, unit } = general.calories
  const { macro, micro } = record.general

  return (
    <div>
      <IngredientCaloriesInfo value={value} unit={unit} />
      <IngredientMacroInfo macroInfo={macro} label="Macronutrients" />
      <IngredientMicroInfo microInfo={micro} label="Micronutrients" />
    </div>
  )
}

export const IngredientGeneralInfo = withCollapse(IngredientGeneralInfoRaw)

IngredientGeneralInfo.displayName = 'IngredGeneralInfo'

IngredientGeneralInfo.defaultProps = {
  label: 'General information'
}
