import recipes from '../enums/recipes'

export const getRecipesFromUser = id => recipes

export const findRecipeByName = name =>
  Object.values(recipes)
    .map(recipe => recipe.name)
    .find(recipe => recipe.name === name)

export const getNutrients = food => ({
  minerals: {
    calcium: { units: 'mg', amount: 143 },
    iron: { units: 'mg', amount: 2 },
    iodine: { units: 'mg', amount: 8 },
    selenio: { units: 'mg', amount: 3 },
    sodio: { units: 'mg', amount: 24 },
  },
  vitamins: {
    B1: { units: 'mg', amount: 0.51 },
    B2: { units: 'mg', amount: 0.22 },
    B3: { units: 'mg', amount: 6.7 },
    B9: { units: 'ug', amount: 490 },
    A: { units: 'mg', amount: 4.5 },
  },
  energy: { amount: 292, units: 'kcal' },
  protein: { amount: 23, units: 'g' },
  carbohydrates: { amount: 35, units: 'g' },
  fiber: { amount: 24.1, units: 'g' },
  fat: { amount: 0.83, units: 'g' },
  AGS: { amount: 0.12, units: 'g' },
  AGP: { amount: 0.46, units: 'g' },
  AGM: { amount: 0.06, units: 'g' },
})
