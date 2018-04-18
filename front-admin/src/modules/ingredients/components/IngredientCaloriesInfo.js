import React from 'react'
import PropTypes from 'prop-types'

export const IngredientCaloriesInfo = ({ value, unit }) => {
    return (
        <div>
            Calories {value} {unit}
        </div>
    )
}

IngredientCaloriesInfo.propTypes = {
    value: PropTypes.number,
    unit: PropTypes.string
}