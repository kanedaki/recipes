import { prop, curry } from 'ramda'
import { normalizeWith, objNormalizeWith, filterWithKeys } from '../utils'
import { dayPercentageNutrients, dayCalories } from './user'
import { numberOfMeals } from './template'

export const MAX_ITERATIONS = 200

export const calculateFitness =
  curry(async (desiredCalories, desiredNutrientsPercentage, menuCalories, menuNutrientsPercentage) => {
    const caloriesPoints = normalizeWith(desiredCalories)
    const nutrientsPoints = objNormalizeWith(
      desiredNutrientsPercentage,
      menuNutrientsPercentage,
    )
    return caloriesPoints + nutrientsPoints
  })

export const removeNotConsumed = (menu, template) => menu.map((dayMenu, i) => {
  const dayTemplate = template[i] || {}
  return filterWithKeys(key => (prop(key, dayTemplate)), dayMenu)
})

const userCaloriesPerMenu = (template, userDescription) =>
  dayCalories(userDescription) * numberOfMeals(template)

const MIN_FITNESS = 1000

export const findBestMenu = (menuIterator, template, userDescription) => {
  const desiredCalories = userCaloriesPerMenu(template, userDescription)
  const desiredNutrientsPercentage = dayPercentageNutrients(userDescription)
  const getFitness = calculateFitness(desiredCalories, desiredNutrientsPercentage)

  let bestFitness = MIN_FITNESS
  let fitness
  let bestMenu = 'No menu found'
  /* eslint-disable  */
  for (const { menu, nutrients, calories } of menuIterator) {
    fitness = getFitness(calories, nutrients)
    if (bestFitness < fitness) {
      bestFitness = fitness
      bestMenu = menu
    }
  }
  /* eslint-enable */
  return bestMenu
}
