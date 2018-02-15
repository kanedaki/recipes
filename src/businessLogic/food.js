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
    carbohydrates: pathOr(['general', 'macro', 'carbohydrates'], ingredient),
    fats: pathOr(['general', 'macro', 'fats'], ingredient),
    protein: pathOr(['general', 'macro', 'protein'], ingredient),
  }
}

