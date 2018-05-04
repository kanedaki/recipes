import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { TextInput } from 'admin-on-rest'

export const IngredientNutrient = ({ cat, subCat, subCatName, label, value, unit }) => {
  return (
    <Field
      name={`${cat}.${subCat}.${subCatName}.value`}
      type="text"
      component={TextInput}
      label={ unit ? `${label} (${unit})` : `${label} (No unit)` }
    />
  )
}

IngredientNutrient.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  unit: PropTypes.string,
}

IngredientNutrient.defaultProps = {
  value: 0
}
