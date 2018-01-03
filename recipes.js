import { propEq } from "ramda";
import { getRandomFromObject, findOrMessage } from "./utils";
import MealTypes from "./mealTypes";
import recipes from "./recipes/index";

export function matchMealType(recipe, mealType) {
  if (!recipe) return false;
  return propEq("mealType", mealType, recipe);
}

function findRecipeByName(name) {
  return Object.values(recipes)
    .map(recipe => recipe.name)
    .find(recipe => recipe.name === name);
}

export function createMenu(template) {
  return template.map(({ lunch, dinner }) => {
    return {
      lunch: getRecipeForMealType(lunch),
      dinner: getRecipeForMealType(dinner),
    };
  });
}

const NO_RECIPE_ERROR = "no recipe for";
const getRecipeForMealType = findOrMessage(findRecipe, NO_RECIPE_ERROR);

function findRecipe(mealType) {
  if (!MealTypes.includes(mealType)) return undefined;
  while (true) {
    const rndRecipe = getRandomFromObject(recipes);
    if (matchMealType(rndRecipe, mealType)) {
      return rndRecipe;
    }
  }
}
