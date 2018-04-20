import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { TextInput } from 'admin-on-rest'

const renderField = props => (
  <div className="renderField">
    <label>{props.label}</label>
    <input {...props.input} type={props.type} placeholder={0} />
    {props.touched && props.error && <span>{props.error}</span>}
  </div>
)

export const IngredientNutrient = ({ cat, subCat, subCatName, label, value, unit }) => {
  return (
    <Field
      name={`${cat}.${subCat}.${subCatName}.value`}
      type="text"
      component={TextInput}
      label={label}
      unit={unit}
    />
  )
}

IngredientNutrient.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  unit: PropTypes.string.isRequired
}

IngredientNutrient.defaultProps = {
  value: 0
}
