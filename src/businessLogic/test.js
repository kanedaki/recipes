/* global expect, describe, it */

describe('business logic', () => {
  describe('food', async () => {
    it('gets the nutrients of an ingredient', async () => {
      const ingredientName = 'salsa de soja'
      const nutrients = await getFoodNutrients(ingredientName)
      expect(nutrients).toEqual({
        carbohydrates,
      })
    })
  })
})
