/* globals describe, it, expect, jest */
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
import { getUserRecipes } from '../repo/mongo-repo'
import { macronutrientsAveragePercentage, macronutrientsRda } from '../constraints/nutrients'

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

const shoppingListForMenuAlternativo = [{ ingredient: '5a83449dd9594c4b4024d8ec', qty: 1500, tip: 'Espaguetis' }, { ingredient: '5a83449dd9594c4b4024da76', qty: 150 }, { ingredient: '5a83449cd9594c4b4024d7e2', qty: 30 }, { ingredient: '5a83449dd9594c4b4024d981', qty: 300 }, { ingredient: '5a83449dd9594c4b4024d95c', qty: 300 }, { ingredient: '5a83449dd9594c4b4024da8d', qty: 3000 }, { ingredient: '5a83449dd9594c4b4024d953', qty: 2250 }, { ingredient: '5a83449dd9594c4b4024d974', qty: 300 }, { ingredient: '5a83449cd9594c4b4024d7e5', qty: 450 }, { ingredient: '5a83449dd9594c4b4024d8d9', qty: 450 }, { ingredient: '5a83449dd9594c4b4024da28', qty: 3 }, { ingredient: '5a83449dd9594c4b4024da27', qty: 3 }, { ingredient: '5a83449dd9594c4b4024da22', qty: 3 }]


describe('test', () => {
  describe('menu restrictions', () => {
    it('does not repeat recipes on the same menu', async () => {
      const menu = await createMenu(template)
      expect(hasRepeatedRecipes(menu)).toBeFalsy()
    })
    it('recipes from menu belongs to dinner or lunch', async () => {
      const menu = await createMenu(template)
      expect(menuRecipesMatchMeals([lunch, dinner, breakfast], menu)).toBe(true)
    })
    it('includes just Season recommendations', async () => {
      const menu = await createMenu(template)
      const season = getSeason()
      expect(menuRecipesMatchSeason(season, menu)).toBe(true)
    })
  })
  describe('match', () => {
    describe('fails when the menu does not correspond to template because', () => {
      it('creates a menu that matches the given template', async () => {
        const menu = await createMenu(template)
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
      const list = JSON.parse(JSON.stringify(getShoppingList(menu)))
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
    it('should work', async () => {
      jest.setTimeout(20000)
      const balancedMenu = await createBalancedMenu(template, {
        activity: 'light',
        sex: 'male',
        age: 34,
        height: 185,
        weight: 85,
      })
      expect(balancedMenu).toBeTruthy()
    })
  })
  describe('Nutrients', () => {
    it('gets the average nutrients for user', () => {
      const user = { sex: 'male' }
      const nutrients = macronutrientsAveragePercentage(user)
      expect(nutrients).toEqual({
        carbohydrates: 57,
        fat: 25,
        protein: 15,
      })
    })
    it('gets the rda nutrients for user', () => {
      const user = { sex: 'male' }
      const nutrients = macronutrientsRda(user)
      expect(nutrients).toEqual({
        carbohydrates: 130,
        fat: Symbol.for('Not determined'),
        protein: 56,
      })
    })
  })
})
