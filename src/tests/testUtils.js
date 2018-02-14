import { uniq, map, all, anyPass, equals, keys, curry } from 'ramda'
import { matchSeason } from '../businessLogic/recipe'

export function match(menu, template) {
  if (menu.length !== template.length) return false
  return menu.every((day, index) => equals(keys(day), keys(template[index])))
}

const getRecipesFromMenu = menu =>
  menu.reduce((recipes, day) => {
    keys(day).forEach(meal => recipes.push(day[meal]))
    return recipes
  }, [])

export function hasRepeatedRecipes(menu) {
  const recipes = getRecipesFromMenu(menu)
  const uniqRecipes = uniq(recipes)
  return uniqRecipes.length !== recipes.length
}

const belongsToMeal = curry((meal, recipe) => recipe.meal.includes(meal))

export function menuRecipesMatchMeals(meals, menu) {
  const recipes = getRecipesFromMenu(menu)
  return all(anyPass(map(belongsToMeal, meals)))(recipes)
}

export function menuRecipesMatchSeason(season, menu) {
  const recipes = getRecipesFromMenu(menu)
  return all(matchSeason(season))(recipes)
}
