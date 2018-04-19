import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

const renderField = props => (
    <div>
        <label>{props.label}</label>    
        <input {...props.input} type={props.type} placeholder={0} />
        {props.touched && props.error && <span>{props.error}</span>}
    </div>
)

export const IngredientNutrient = ({ generalSubCat, name, value, unit }) => {
    return (
        <Field 
            name={`general.${generalSubCat}.${name}.value`}
            type='text'
            component={renderField}
            label={name}
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