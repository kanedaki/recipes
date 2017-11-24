const getRandom = require('./utils').getRandom;

const MealTypes = {
  Pasta: ['Espagueti pesto'],
  Pescado: ['Lubina horno'],
  Arroz: ['Tres delicias', 'Paella'],
  Verduras: ['Acelgas con garbanzos', 'Menestra'],
  Carne: ['Guiso de ciervo', 'Chuleton con patatas'],
  Legumbres: ['Lentejas con chorizo', 'Acelgas con garbanzos']
};

function isMealType(recipe, mealType) {
  return MealTypes[mealType].includes(recipe);
}

function match(menu, template) {
  if (menu.length !== template.length) return false;
  return menu.every(({ lunch, dinner }, index) => {
    const comidaTemplate = template[index].lunch;
    const cenaTemplate = template[index].dinner;
    return (
      isMealType(lunch, comidaTemplate) && isMealType(dinner, cenaTemplate)
    );
  });
}

function findRecipe(mealType) {
  return getRandom(MealTypes[mealType]);
}
const findOrMessage = function(fn, msg) {
  return function(...args) {
    const result = fn.apply(this, args);
    return result || `${msg} ${args}`;
  };
};

const getRecipeForMealType = findOrMessage(findRecipe, 'no recipe for');

function createMenu(template) {
  return template.map(({ lunch, dinner }) => {
    return {
      lunch: getRecipeForMealType(lunch),
      dinner: getRecipeForMealType(dinner)
    };
  });
}

module.exports = {
  createMenu,
  match
};
