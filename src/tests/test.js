/* globals describe, it, expect, jest */
import { createMenu, createBalancedMenu } from '../businessLogic/menu'
import { createShoppingList } from '../businessLogic/shoppingList'
import {
  match,
  hasRepeatedRecipes,
  menuRecipesMatchMeals,
  menuRecipesMatchSeason,
} from './testUtils'
import { dinner, lunch, breakfast } from '../businessLogic/enums/meals'
import { getSeason } from '../utils'
import { getUserRecipes } from '../repo/mongo-repo'
import {
  macronutrientsAveragePercentage,
  macronutrientsRda,
  updateBalance,
} from '../businessLogic/constraints/nutrients'
import { light } from '../businessLogic/enums/activity'
import { male } from '../businessLogic/enums/sex'

const userDescription = {
  sex: male,
  activity: light,
  age: 34,
  height: 179,
  weight: 78,
}

const template = [
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true, [breakfast]: true },
]

const menuAlternativo = async () => {
  const [recipe1, recipe2] = await getUserRecipes()
  return [
    { [lunch]: recipe1, [dinner]: recipe2 },
    { [lunch]: recipe1, [dinner]: recipe2 },
    { [lunch]: recipe1, [dinner]: recipe2 },
  ]
}

const shoppingListForMenuAlternativo = [{ ingredient: 'pasta', qty: 1500, tip: 'Espaguetis' }, { ingredient: 'ajo', qty: 150, tip: null }, { ingredient: 'aceite de oliva virgen', qty: 30, tip: null }, { ingredient: 'queso parmesano', qty: 300, tip: null }, { ingredient: 'nata liquida para cocinar', qty: 300, tip: null }, { ingredient: 'coliflor', qty: 3000, tip: null }, { ingredient: 'leche de vaca entera', qty: 2250, tip: null }, { ingredient: 'queso emmental', qty: 300, tip: null }, { ingredient: 'mantequilla', qty: 450, tip: null }, { ingredient: 'harina de trigo', qty: 450, tip: null }, { ingredient: 'sal comun', qty: 3, tip: null }, { ingredient: 'pimienta negra', qty: 3, tip: null }, { ingredient: 'nuez moscada', qty: 3, tip: null }]


describe.skip('test', () => {
  describe('menu restrictions', () => {
    it('does not repeat recipes on the same menu', async () => {
      const menu = await createMenu(userDescription, template)
      expect(hasRepeatedRecipes(menu)).toBeFalsy()
    })
    it('recipes from menu belongs to dinner or lunch', async () => {
      const menu = await createMenu(userDescription, template)
      expect(menuRecipesMatchMeals([lunch, dinner, breakfast], menu)).toBe(true)
    })
    it('includes just Season recommendations', async () => {
      const menu = await createMenu(userDescription, template)
      const season = getSeason()
      expect(menuRecipesMatchSeason(season, menu)).toBe(true)
    })
  })
  describe('match', () => {
    describe('fails when the menu does not correspond to template because', () => {
      it('creates a menu that matches the given template', async () => {
        const menu = await createMenu(userDescription, template)
        expect(match(menu, template)).toBe(true)
      })
      it('different number of days', async () => {
        const menu = await menuAlternativo()
        expect(match(menu, template)).toBe(false)
      })
    })
  })
  describe('shopping list', () => {
    it('returns the correct shopping list for a menu', async () => {
      const menu = await menuAlternativo()
      // ObjectId needs to be stringified to be tested
      const list = JSON.parse(JSON.stringify(createShoppingList(menu)))
      expect(list).toEqual(shoppingListForMenuAlternativo)
    })
  })
  describe('Balanced menu', () => {
    it('should work', async () => {
      jest.setTimeout(20000)
      const balancedMenu = await createBalancedMenu('kanedaki')
      expect(balancedMenu).toBeTruthy()
    })
  })
  describe('Nutrients', () => {
    it('gets the average nutrients for user', () => {
      const nutrients = macronutrientsAveragePercentage(userDescription)
      expect(nutrients).toEqual({
        carbohydrates: 57,
        fat: 25,
        protein: 15,
      })
    })
    it('gets the rda nutrients for user', () => {
      const nutrients = macronutrientsRda(userDescription)
      expect(nutrients).toEqual({
        carbohydrates: 130,
        fat: Symbol.for('Not determined'),
        protein: 56,
      })
    })
    it('updates current balace based on nutrients', () => {
      const nutrients = {
        carbohydrates: 100,
        fat: 100,
        protein: 100,
      }
      const currentBalance = {
        carbohydrates: 150,
        fat: 150,
        protein: 150,
      }
      const newBalance = updateBalance(nutrients, currentBalance)
      expect(newBalance).toEqual({
        carbohydrates: 115,
        fat: 115,
        protein: 115,
      })
    })
    it('computes new balance as nutrients when no current balance exists', () => {
      const nutrients = {
        carbohydrates: 70,
        fat: 200,
        protein: 100,
      }
      const newBalance = updateBalance(nutrients)
      expect(newBalance).toEqual(nutrients)
    })
  })
})
