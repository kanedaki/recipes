import { getRandomNumber } from './utils'
import { findIngredient } from './repo/mongo-repo'

export const getFoodCalories = () => getRandomNumber(200)

export const getFoodCalories1 = (ingredient) => {
  const ingredientInfo = findIngredient(ingredient)
}

export const getFoodNutrients = findIngredient
