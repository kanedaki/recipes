import { prop, curry } from 'ramda'
import { normalizeWith, objNormalizeWith, filterWithKeys } from '../utils'
import { dayPercentageNutrients, dayCalories } from './user'
import { numberOfMeals } from './template'

const MAX_ITERATIONS = 200
const MIN_FITNESS = 1000
const OPTIMUS_FITNESS = 5

const calculateFitness =
  curry((desiredCalories, desiredNutrientsPercentage, menuCalories, menuNutrientsPercentage) => {
    const caloriesPoints = normalizeWith(desiredCalories, menuCalories)
    const nutrientsPoints = objNormalizeWith(
      desiredNutrientsPercentage,
      menuNutrientsPercentage,
    )
    return caloriesPoints + nutrientsPoints
  })

const userCaloriesPerMenu = (template, userDescription) =>
  dayCalories(userDescription) * numberOfMeals(template)

export const removeNotConsumed = (menu, template) => menu.map((dayMenu, i) => {
  const dayTemplate = template[i] || {}
  return filterWithKeys(key => (prop(key, dayTemplate)), dayMenu)
})

export const findBestMenu = async (menuIterator, template, userDescription) => {
  const desiredCalories = userCaloriesPerMenu(template, userDescription)
  const desiredNutrientsPercentage = dayPercentageNutrients(userDescription)
  const getFitness = calculateFitness(desiredCalories, desiredNutrientsPercentage)

  let bestFitness = MIN_FITNESS
  let fitness
  let bestMenu = 'No menu found'
  let iteration = 0

  for await (const { calories, nutrients, menu } of menuIterator()) {
    iteration += 1
    fitness = getFitness(calories, nutrients)
    if (fitness < bestFitness) {
      bestFitness = fitness
      bestMenu = menu
    }
    if (fitness < OPTIMUS_FITNESS || iteration > MAX_ITERATIONS) break
  }
  return bestMenu
}
