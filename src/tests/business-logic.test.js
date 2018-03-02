import { removeNotConsumed, findBestMenu } from '../businessLogic/menu'
import { light } from '../businessLogic/enums/activity'
import { male } from '../businessLogic/enums/sex'
import { lunch, breakfast } from '../businessLogic/enums/meals'
import { getRandomNumber } from '../utils'
import { findMatchingRecipe } from '../businessLogic/recipe'
import recipe1 from './mocks/recipe1'
import recipe2 from './mocks/recipe2'

/* global expect, describe, it */

describe('business logic', () => {
  const menu = [{ lunch: 'recipe1', dinner: 'recipe2' }, { lunch: 'recipe3', dinner: 'recipe4' }, { breakfast: 'recipe5' }]
  const template = [{ lunch: true, dinner: true }]
  const userDescription = {
    sex: male,
    activity: light,
    age: 34,
    height: 179,
    weight: 78,
  }
  const nutrients = () => ({
    carbohydrates: getRandomNumber(60),
    protein: getRandomNumber(10),
    fat: getRandomNumber(30),
  })
  const calories = () => getRandomNumber(100)
  const menuIteratorMock = function* next() {
    while (true) {
      yield Promise.resolve({ menu, nutrients: nutrients(), calories: calories() })
    }
  }
  const userRecipes = [recipe1, recipe2]
  describe('menu', async () => {
    it('remove the recipes not consumed', async () => {
      const filterMenu = removeNotConsumed(menu, template)
      expect(filterMenu).toEqual([{ lunch: 'recipe1', dinner: 'recipe2' }])
    })
    describe('find best menu', () => {
      it('works', async () => {
        const bestMenu = await findBestMenu(menuIteratorMock, template, userDescription)
        expect(bestMenu).toBeTruthy()
      })
    })
  })
  describe('recipe', () => {
    it('find a recipe matching patterns', async () => {
      const currentMenu = [{ lunch: recipe1 }]
      const dayRecipes = []
      const meal = lunch
      const recipe = await findMatchingRecipe(userRecipes, currentMenu, dayRecipes, meal)
      expect(recipe).toEqual(recipe2)
    })
    it('not find a recipe matching meal', async () => {
      const currentMenu = [{ lunch: recipe1 }]
      const dayRecipes = []
      const meal = breakfast
      const recipe = await findMatchingRecipe(userRecipes, currentMenu, dayRecipes, meal)
      expect(recipe).toEqual(undefined)
    })
    it('not find a recipe not included already in menu', async () => {
      const currentMenu = [{ lunch: recipe1, dinner: recipe2 }]
      const dayRecipes = []
      const meal = lunch
      const recipe = await findMatchingRecipe(userRecipes, currentMenu, dayRecipes, meal)
      expect(recipe).toEqual(undefined)
    })
    it('not find a recipe not included already in day recipes', async () => {
      const currentMenu = [{ lunch: recipe1 }]
      const dayRecipes = { dinner: recipe2 }
      const meal = lunch
      const recipe = await findMatchingRecipe(userRecipes, currentMenu, dayRecipes, meal)
      expect(recipe).toEqual(undefined)
    })
  })
  describe('shopping list', () => {
    it('')
  })
})
