import { getRandomNumber } from './utils'

export const getFoodCalories = () => getRandomNumber(200)

export const getFoodNutrients = () => ({
  carbohydrates: getRandomNumber(57),
  fat: getRandomNumber(25),
  protein: getRandomNumber(15),
})
