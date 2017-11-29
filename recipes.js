const {map, zip, allPass, compose, values} = require('ramda')
const { getRandom, findOrMessage, sameLength, pack, unpack } = require('./utils');

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


const matchDayMealTypes = map(matchMealType)
const match = compose(allPass([matchDayMealTypes]), zip, unpack, map(values), pack)

const getDayRecipes = map(getRecipeForMealType)
const createMenu = map(getDayRecipes)

module.exports = {
  createMenu,
  match
};
