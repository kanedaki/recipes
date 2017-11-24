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

const getRecipeForMealType = findOrThrow(findRecipe, 'no recipe');

function findOrThrow(fn, error) {
  return function(...args) {
    const result = fn.apply(this, args);
    if (!result) throw new Error(error);
    return result;
  };
}

function catcher(fn, msg) {
  return function(...args) {
    try {
      return fn.apply(this, args);
    } catch (e) {
      return `${msg} ${args}`;
    }
  };
}

const getRecipe = catcher(getRecipeForMealType, 'no recipe for');

function createMenu(template) {
  return template.map(({ lunch, dinner }) => {
    return {
      lunch: getRecipe(lunch),
      dinner: getRecipe(dinner)
    };
  });
}

module.exports = {
  createMenu,
  match
};
