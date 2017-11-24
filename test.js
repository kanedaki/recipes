const template = [
  { Comida: 'Pasta', Cena: 'Verdura' },
  { Comida: 'Pescado', Cena: 'Arroz' },
  { Comida: 'Verduras', Cena: 'Carne' },
  { Comida: 'Legumbres', Cena: 'Arroz' }
];

const menu = [
  { Comida: 'Espagueti pesto', Cena: 'Menestra' },
  { Comida: 'Lubina horno', Cena: 'Paella' },
  { Comida: 'Acelgas con garbanzos', Cena: 'Guiso de ciervo' },
  { Comida: 'Lentejas con chorizo', Cena: 'Tres delicias' }
];

const menuAlternativo = [
  { Comida: 'Lubina horno', Cena: 'Paella' },
  { Comida: 'Acelgas con garbanzos', Cena: 'Guiso de ciervo' },
  { Comida: 'Lentejas con chorizo', Cena: 'Tres delicias' }
];

const menuDiferente = [
  { Comida: 'Lubina horno', Cena: 'Paella' },
  { Comida: 'Lubina horno', Cena: 'Paella' },
  { Comida: 'Acelgas con garbanzos', Cena: 'Guiso de ciervo' },
  { Comida: 'Lentejas con chorizo', Cena: 'Tres delicias' }
];

function match(menu, template) {
  if (menu.length !== template.length) return false;
  return menu.every(({ Comida, Cena }, index) => {
    const comidaTemplate = template[index].Comida;
    const cenaTemplate = template[index].Cena;
    return isMealType(Comida, comidaTemplate) && isMealType(Cena, cenaTemplate);
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
