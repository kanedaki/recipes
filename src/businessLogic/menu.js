import { prop, curry } from 'ramda'
import { normalizeWith, objNormalizeWith, filterWithKeys } from '../utils'
import { dayPercentageNutrients, dayCalories } from './user'
import { numberOfMeals } from './template'

export const MAX_ITERATIONS = 200

export const calculateFitness =
  curry((desiredCalories, desiredNutrientsPercentage, menuCalories, menuNutrientsPercentage) => {
    const caloriesPoints = normalizeWith(desiredCalories, menuCalories)
    console.log('c points', caloriesPoints)
    const nutrientsPoints = objNormalizeWith(
      desiredNutrientsPercentage,
      menuNutrientsPercentage,
    )
    console.log('n points', nutrientsPoints)
    return caloriesPoints + nutrientsPoints
  })

export const removeNotConsumed = (menu, template) => menu.map((dayMenu, i) => {
  const dayTemplate = template[i] || {}
  return filterWithKeys(key => (prop(key, dayTemplate)), dayMenu)
})

const userCaloriesPerMenu = (template, userDescription) =>
  dayCalories(userDescription) * numberOfMeals(template)

const MIN_FITNESS = 1000

export const findBestMenu = async (menuIterator, template, userDescription) => {
  const desiredCalories = userCaloriesPerMenu(template, userDescription)
  const desiredNutrientsPercentage = dayPercentageNutrients(userDescription)
  const getFitness = calculateFitness(desiredCalories, desiredNutrientsPercentage)

  let bestFitness = MIN_FITNESS
  let fitness
  let bestMenu = 'No menu found'
  let iteration = 0

  while (iteration < MAX_ITERATIONS) {
    iteration += 1
    const { menu, calories, nutrients } = await menuIterator()
    fitness = getFitness(calories, nutrients)
    if (fitness < bestFitness) {
      bestFitness = fitness
      bestMenu = menu
    }
    if (fitness < 2 || iteration > MAX_ITERATIONS) break
  }
  return bestMenu
}
