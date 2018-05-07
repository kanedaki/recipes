import React from 'react'

export const RecipeIngredients = ({ record }) => {
  const { ingredients } = record
  if (!ingredients) return null

  return (
    <div>
        {ingredients.map(el => <li key={el.ingredient}>{el.qty} {el.unit} de {el.ingredient}</li>)}
    </div>
  )
}
