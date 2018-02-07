import { uniq, map, all, allPass, compose, any, propEq } from 'ramda'
import { matchMealType, matchMeal, matchSeason } from '../menu'

export function match(menu, template) {
  if (menu.length !== template.length) return false
  return menu.every(({ lunch, dinner }, index) => {
    const { lunch: lunchMealType, dinner: dinnerMealType } = template[index]
    return (
      matchMealType({ mealType: lunchMealType })(lunch) &&
      matchMealType({ mealType: dinnerMealType })(dinner)
    )
  })
}

const getRecipesFromMenu = menu =>
  menu.reduce((recipes, { lunch, dinner }) => {
    recipes.push(lunch)
    recipes.push(dinner)
    return recipes
  }, [])

const getRecipesOfMeal = meal => menu =>
  menu.map((recipes, dayMenu) => {
    dayMenu[meal]
  })

export function hasRepeatedRecipes(menu) {
  const recipes = getRecipesFromMenu(menu)
  const uniqRecipes = uniq(recipes)
  return uniqRecipes.length !== recipes.length
}

const belongsToMealType = meal => recipeMealTypes =>
  recipeMealTypes.includes(meal)

export function menuRecipesMatchMealTypes(mealTypes, menu) {
  const recipes = getRecipesFromMenu(menu)
  return all(all(map(belongsToMealType, mealTypes)))(recipes)
}

export function menuRecipesMatchSeason(season, menu) {
  const recipes = getRecipesFromMenu(menu)
  return all(matchSeason(season))(recipes)
}
