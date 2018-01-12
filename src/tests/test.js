import { createMenu } from '../recipes';
import { getShoppingList, removeElement } from '../shoppingList';
import menu from './exampleMenu';
import shoppingList from './exampleList';
import { match } from './testUtils';
import {
  coliflorGratinada,
  judiasVerdes,
  polloGuisado,
  salmonSoja,
} from '../recipes';
import {
  pasta,
  verduras,
  pescado,
  carne,
  legumbres,
  arroz,
  fruta,
} from '../mealTypes';

const template = [
  { lunch: pasta, dinner: verduras },
  { lunch: pescado, dinner: arroz },
  { lunch: verduras, dinner: carne },
  { lunch: legumbres, dinner: arroz },
];

const template2 = [{ lunch: 'caramelos', dinner: 'chuches' }];

const menuAlternativo = [
  { lunch: 'Salmon con soja', dinner: 'Paella de verduras' },
  { lunch: 'Judias verdes', dinner: 'Pollo guisado' },
  { lunch: 'Lentejas guisadas', dinner: 'Paella de verduras' },
];

const menuDiferente = [
  { lunch: 'Salmon con soja', dinner: 'Paella de verduras' },
  { lunch: 'Salmon con soja', dinner: 'Paella de verduras' },
  { lunch: 'Judias verdes', dinner: 'Pollo guisado' },
  { lunch: 'Lentejas guisadas', dinner: 'Paella de verduras' },
];

describe('test', () => {
  it('Creates a menu that matches the given template', () => {
    const menu = createMenu(template);
    expect(match(menu, template)).toBeTruthy();
  });
  it('return a proper message for every meal if the meal type in the template does not exists', () => {
    const menu = createMenu(template2);
    expect(menu[0].lunch).toBe('no recipe for caramelos');
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
  describe('shopping list', () => {
    it('returns the correct shopping list for a menu', () => {
      const list = getShoppingList(menu);
      expect(list).toEqual(shoppingList);
    });
    it('removes an element that exist on the list from the list', () => {
      const element = shoppingList[0]
      const newList = removeElement(shoppingList, element);
      expect(newList.length).toEqual(shoppingList.length - 1);
    })
  });
});
