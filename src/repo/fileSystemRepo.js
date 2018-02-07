import recipes from '../enums/recipes'

export const getRecipesFromUser = id => recipes

export const findRecipeByName = name =>
  Object.values(recipes)
    .map(recipe => recipe.name)
    .find(recipe => recipe.name === name)
