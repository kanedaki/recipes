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

function getRecipeForMealType(mealType) {
  const randomRecipe = getRandom(MealTypes[mealType]);
  if (!randomRecipe) throw new Error('no recipe');
  return randomRecipe;
}
/*

*/
function createMenu(template) {
  return template.map(({ lunch, dinner }) => {
    let lunchRecipe;
    let dinnerRecipe;
    try {
      lunchRecipe = getRecipeForMealType(lunch);
    } catch (e) {
      lunchRecipe = `no recipe for ${lunch}`;
    }
    try {
      dinnerRecipe = getRecipeForMealType(dinner);
    } catch (e) {
      dinnerRecipe = `no recipe for ${dinner}`;
    }
    return {
      lunch: lunchRecipe,
      dinner: dinnerRecipe
    };
  });
}

module.exports = {
  createMenu,
  match
};
