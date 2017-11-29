const R = require('rambda')
const { getRandom, findOrMessage, sameLength } = require('./utils');

const MealTypes = {
  Pasta: ['Espagueti pesto'],
  Pescado: ['Lubina horno'],
  Arroz: ['Tres delicias', 'Paella'],
  Verduras: ['Acelgas con garbanzos', 'Menestra'],
  Carne: ['Guiso de ciervo', 'Chuleton con patatas'],
  Legumbres: ['Lentejas con chorizo', 'Acelgas con garbanzos']
};


function matchMealType(recipe, mealType) {
  return MealTypes[mealType].includes(recipe);
}

const NO_RECIPE_ERROR = 'no recipe for';
const getRecipeForMealType = findOrMessage(findRecipe, NO_RECIPE_ERROR);

function findRecipe(mealType) {
  return getRandom(MealTypes[mealType]);
}

function match(menu, template) {
  if (!sameLength(menu, template)) return false;
  return menu.every(({ lunch, dinner }, index) => {
    const { lunch: lunchMealType, dinner: dinnerMealType } = template[index];
    return (
      matchMealType(lunch, lunchMealType) &&
      matchMealType(dinner, dinnerMealType)
    );
  });
}

const getDayRecipes = R.map(getRecipeForMealType)
const createMenu = R.map(getDayRecipes)

module.exports = {
  createMenu,
  match
};
