import {
  uniq,
  map,
  all,
  allPass,
  anyPass,
  compose,
  any,
  propEq,
  equals,
  keys,
  curry,
} from 'ramda'
import { matchMeal, matchSeason } from '../menu'

export function match(menu, template) {
  if (menu.length !== template.length) return false
  return menu.every((day, index) => equals(keys(day), keys(template[index])))
}

const getRecipesFromMenu = menu =>
  menu.reduce((recipes, day) => {
    keys(day).forEach(meal => recipes.push(day[meal]))
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

const belongsToMeal = curry((meal, recipe) => recipe.meal.includes(meal))

export function menuRecipesMatchMeals(meals, menu) {
  const recipes = getRecipesFromMenu(menu)
  return all(anyPass(map(belongsToMeal, meals)))(recipes)
}

export function menuRecipesMatchSeason(season, menu) {
  const recipes = getRecipesFromMenu(menu)
  return all(matchSeason(season))(recipes)
}
