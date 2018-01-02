const { getRandom, findOrMessage } = require("./utils");

module.exports = {
  createMenu,
  match,
};

function match(menu, template) {
  if (menu.length !== template.length) return false;
  return menu.every(({ lunch, dinner }, index) => {
    const { lunch: lunchMealType, dinner: dinnerMealType } = template[index];
    return (
      matchMealType(lunch, lunchMealType) &&
      matchMealType(dinner, dinnerMealType)
    );
  });
}

function createMenu(template) {
  return template.map(({ lunch, dinner }) => {
    return {
      lunch: getRecipeForMealType(lunch),
      dinner: getRecipeForMealType(dinner),
    };
  });
}

const MealTypes = {
  Pasta: ["Espagueti pesto"],
  Pescado: ["Lubina horno"],
  Arroz: ["Tres delicias", "Paella"],
  Verduras: ["Acelgas con garbanzos", "Menestra"],
  Carne: ["Guiso de ciervo", "Chuleton con patatas"],
  Legumbres: ["Lentejas con chorizo", "Acelgas con garbanzos"],
};

function matchMealType(recipe, mealType) {
  return MealTypes[mealType].includes(recipe);
}

const NO_RECIPE_ERROR = "no recipe for";
const getRecipeForMealType = findOrMessage(findRecipe, NO_RECIPE_ERROR);

function findRecipe(mealType) {
  return getRandom(MealTypes[mealType]);
}
