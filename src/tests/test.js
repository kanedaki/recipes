/* globals describe, it, expect */
import { createMenu, createBalancedMenu } from '../menu'
import {
  getShoppingList,
  removeElement,
  addElementToShoppingList,
} from '../shoppingList'
import {
  match,
  hasRepeatedRecipes,
  menuRecipesMatchMeals,
  menuRecipesMatchSeason,
} from './testUtils'
import { dinner, lunch, breakfast } from '../enums/meals'
import { getSeason } from '../utils'
import { getRecipesFromUser } from '../repo/fileSystemRepo'

const recipes = getRecipesFromUser()

const template = [
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true, [breakfast]: true },
]

const menuAlternativo = [
  { [lunch]: recipes[1], [dinner]: recipes[2] },
  { [lunch]: recipes[1], [dinner]: recipes[2] },
  { [lunch]: recipes[1], [dinner]: recipes[2] },
]

const shoppingListForMenuAlternativo = [
  {
    ingredient: {
      name: 'nata',
      type: 'lacteos',
    },
    qty: 300,
  },
  {
    ingredient: {
      name: 'coliflor',
      type: 'verduras',
    },
    qty: 3000,
  },
  {
    ingredient: {
      name: 'leche',
      type: 'lacteos',
    },
    qty: 2250,
  },
  {
    ingredient: {
      name: 'queso rayado',
      type: 'lacteos',
    },
    qty: 300,
  },
  {
    ingredient: {
      name: 'mantequilla',
      type: 'grasas animales',
    },
    qty: 450,
  },
  {
    ingredient: {
      name: 'Harina',
      type: 'cereales',
    },
    qty: 450,
  },
  {
    ingredient: {
      name: 'sal',
      type: 'sales',
    },
    qty: 3,
  },
  {
    ingredient: {
      name: 'pimienta negra',
      type: 'condimentos',
    },
    qty: 3,
  },
  {
    ingredient: {
      name: 'nuez moscada',
      type: 'condimentos',
    },
    qty: 3,
  },
  {
    ingredient: {
      name: 'judias verdes',
      type: 'legumbres',
    },
    qty: 3000,
  },
  {
    ingredient: {
      name: 'tomate',
      type: 'frutas',
    },
    qty: 300,
  },
  {
    ingredient: {
      name: 'cebolla',
      type: 'hortalizas',
    },
    qty: 300,
  },
  {
    ingredient: {
      name: 'ajo',
      type: 'hortalizas',
    },
    qty: 90,
  },
  {
    ingredient: {
      name: 'aceite',
      type: 'grasas vegetales',
    },
    qty: 30,
  },
  {
    ingredient: {
      name: 'Espinacas',
      type: 'verduras',
    },
    qty: 300,
  },
]

describe('test', () => {
  describe('menu restrictions', () => {
    it('does not repeat recipes on the same menu', () => {
      const menu = createMenu(template)
      expect(hasRepeatedRecipes(menu)).toBeFalsy()
    })
    it('recipes from menu belongs to dinner or lunch', () => {
      const menu = createMenu(template)
      expect(menuRecipesMatchMeals([lunch, dinner, breakfast], menu)).toBe(true)
    })
    it('includes just Season recommendations', () => {
      const menu = createMenu(template)
      const season = getSeason()
      expect(menuRecipesMatchSeason(season, menu)).toBe(true)
    })
  })
  describe('match', () => {
    describe('fails when the menu does not correspond to template because', () => {
      it('creates a menu that matches the given template', () => {
        const menu = createMenu(template)
        expect(match(menu, template)).toBe(true)
      })
      it('different number of days', () => {
        expect(match(menuAlternativo, template)).toBe(false)
      })
    })
  })
  describe('shopping list', () => {
    it('returns the correct shopping list for a menu', () => {
      const list = getShoppingList(menuAlternativo)
      expect(list).toEqual(shoppingListForMenuAlternativo)
    })
    it('removes an element that exist on the list from the list', () => {
      const element = shoppingListForMenuAlternativo[0]

      const newList = removeElement(shoppingListForMenuAlternativo, element)
      const ingredientNames = newList.map(element => element.ingredient)

      expect(newList.length).toEqual(shoppingListForMenuAlternativo.length - 1)
      expect(ingredientNames.includes(element.ingredient)).toBe(false)
    })
  })
  describe('addQuantities', () => {
    describe('if the ingredient is already in the list', () => {
      it('increases the ingredient quantity in the list', () => {
        const onion = { ingredient: 'onion', qty: 1 }
        const startingList = [onion]

        const resultList = addElementToShoppingList(startingList, onion)

        expect(resultList).toEqual([{ ingredient: 'onion', qty: 2 }])
      })
    })
    describe('if the ingredient is not in the list', () => {
      it('adds it to the list', () => {
        const onion = { ingredient: 'onion', qty: 1 }
        const startingList = []

        const resultList = addElementToShoppingList(startingList, onion)

        expect(resultList).toEqual([{ ingredient: 'onion', qty: 1 }])
      })
    })
  })
  describe('Balanced menu', () => {
    it('should work', () => {
      const balancedMenu = createBalancedMenu(template, {
        activity: 'light',
        sex: 'male',
        age: 34,
        height: 185,
        weight: 85,
      })
      expect(balancedMenu).toBeTruthy()
    })
  })
})
