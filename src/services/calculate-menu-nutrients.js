import { pathOr, reduce, mergeWith, add, map, prop, values } from 'ramda'

const factory = (app, { findIngredient }) => {
  const getFoodNutrients = async ({ ingredient: ingredientName }) => {
    const ingredient = await findIngredient(ingredientName)
    return {
      carbohydrates: pathOr(0, ['general', 'macro', 'carbohydrates', 'value'], ingredient),
      fats: pathOr(0, ['general', 'macro', 'fat', 'value'], ingredient),
      protein: pathOr(0, ['general', 'macro', 'protein', 'value'], ingredient),
    }
  }
  const calculateRecipeNutrients = async (recipe) => {
    const nutrients = await Promise.all(map(getFoodNutrients, prop('ingredients', recipe)))
    return reduce(mergeWith(add), {}, nutrients)
  }
  const calculateDayNutrients = async (day) => {
    const nutrients = await Promise.all(map(calculateRecipeNutrients, values(day)))
    return reduce(mergeWith(add), {}, nutrients)
  }
  const calculateMenuNutrients = async (menu) => {
    const nutrients = await Promise.all(map(calculateDayNutrients, menu))
    return reduce(mergeWith(add), {}, nutrients)
  }
  return calculateMenuNutrients
}
export default factory
