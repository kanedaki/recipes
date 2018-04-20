import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'admin-on-rest'
import { Field } from 'redux-form' 

export const IngredientCaloriesInfo = ({ value, unit }) => {
    return (
        <Field 
            name='general.calories.value'
            type='number'
            component={TextInput}
            source='calories'
        >
        </Field>
    )
}

IngredientCaloriesInfo.propTypes = {
    value: PropTypes.number,
    unit: PropTypes.string
}