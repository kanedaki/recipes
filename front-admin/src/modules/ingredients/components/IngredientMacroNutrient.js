import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

const renderField = props => (
    <div>
        <label>{props.label}</label>    
        <div>
            <input {...props.input} type={props.type} placeholder={0} />
            {props.touched && props.error && <span>{props.error}</span>}
        </div>
    </div>
)

export const IngredientMacroNutrient = ({ name, value, unit }) => {
    return (
        <Field 
            name={`general.macro.${name}.value`}
            type='text'
            component={renderField}
            label={name}
            unit={unit}
        />
    )
}

IngredientMacroNutrient.propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    unit: PropTypes.string.isRequired
}

IngredientMacroNutrient.defaultProps = {
    value: 0
}