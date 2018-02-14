import { pathOr } from 'ramda'
import { getRandomNumber } from '../utils'
import { findIngredientById } from '../repo/mongo-repo'

export const getFoodCalories = async ({ ingredient: ingredientId }) => {
  const ingredient = await findIngredientById(ingredientId)
  return pathOr(getRandomNumber(200), ['general', 'calories', 'value'], ingredient)
}

export const getFoodNutrients = async ({ ingredient: ingredientId }) => {
  const ingredient = await findIngredientById(ingredientId)
  return {
    carbohydrates: pathOr(['general', 'macro', 'carbohydrates'], ingredient),
    fats: pathOr(['general', 'macro', 'fats'], ingredient),
    protein: pathOr(['general', 'macro', 'protein'], ingredient),
  }
}

