import React from 'react'

export const RecipeTitle = ({ record }) => {
    return <span>Recipe {record ? `"${record.name}"` : ''}</span>;
}
