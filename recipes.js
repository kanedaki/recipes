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

module.exports = {
  match
};
