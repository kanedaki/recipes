import { findIngredient } from "../repo/mongo-repo";
import { getFoodNutrients } from "./food";

describe('business logic', () => {
  describe('food', () => {
    it('gets the nutrients of an ingredient', () => {
      const ingredientName = 'salsa de soja'
      const nutrients = await getFoodNutrients(ingredientName)
      expect(nutrients).toEqual({
        carbohydrates
      })

    })
  })
})
