const template = [
  { lunch: 'Pasta', dinner: 'Verduras' },
  { lunch: 'Pescado', dinner: 'Arroz' },
  { lunch: 'Verduras', dinner: 'Carne' },
  { lunch: 'Legumbres', dinner: 'Arroz' }
];

const menu = [
  { lunch: 'Espagueti pesto', dinner: 'Menestra' },
  { lunch: 'Lubina horno', dinner: 'Paella' },
  { lunch: 'Acelgas con garbanzos', dinner: 'Guiso de ciervo' },
  { lunch: 'Lentejas con chorizo', dinner: 'Tres delicias' }
];

const menuAlternativo = [
  { lunch: 'Lubina horno', dinner: 'Paella' },
  { lunch: 'Acelgas con garbanzos', dinner: 'Guiso de ciervo' },
  { lunch: 'Lentejas con chorizo', dinner: 'Tres delicias' }
];

const menuDiferente = [
  { lunch: 'Lubina horno', dinner: 'Paella' },
  { lunch: 'Lubina horno', dinner: 'Paella' },
  { lunch: 'Acelgas con garbanzos', dinner: 'Guiso de ciervo' },
  { lunch: 'Lentejas con chorizo', dinner: 'Tres delicias' }
];

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

function createMenu(template) {
  const myMenu = menu.slice();
  return myMenu;
}

describe('test', () => {
  it('works!', () => {
    const menu = createMenu(template);
    expect(match(menu, template)).toBeTruthy();
  });
  describe('match', () => {
    describe('fails when the menu does not correspond to template because', () => {
      it('different number of days', () => {
        expect(match(menuAlternativo, template)).toBe(false);
      });
      it('different meal types', () => {
        expect(match(menuDiferente, template)).toBe(false);
      });
    });
  });
});
