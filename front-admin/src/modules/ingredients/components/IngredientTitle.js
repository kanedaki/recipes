import React from 'react'

export const IngredientTitle = ({ record }) => {
    return <span>Ingredient {record ? `"${record.name}"` : ''}</span>;
}