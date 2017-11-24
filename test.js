const recipes = require('./recipes');
const { match, createMenu } = recipes;

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

describe('test', () => {
  it('Creates a menu that matches the given template', () => {
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
