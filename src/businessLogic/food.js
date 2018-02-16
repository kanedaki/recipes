import { pathOr } from 'ramda'
import { getRandomNumber } from '../utils'
import { findIngredient } from '../repo/mongo-repo'

export const getFoodCalories = async (ingredientName) => {
  const ingredient = await findIngredient(ingredientName)
  return pathOr(getRandomNumber(200), ['general', 'calories', 'value'], ingredient)
}

export const getFoodNutrients = async ({ ingredient: ingredientName }) => {
  const ingredient = await findIngredient(ingredientName)
  return {
    carbohydrates: pathOr(0, ['general', 'macro', 'carbohydrates', 'value'], ingredient),
    fats: pathOr(0, ['general', 'macro', 'fat', 'value'], ingredient),
    protein: pathOr(0, ['general', 'macro', 'protein', 'value'], ingredient),
  }
}

