import { fruta } from '../mealTypes'
import { fresas } from '../ingredients/fridge'
import { leche } from '../ingredients/pantry'

export default {
  mealType: fruta,
  name: 'Batido de fresa',
  ingredients: [
    { ingredient: leche, qty: 1 },
    { ingredient: fresas, qty: 1 }
  ],
  steps: ['batir todo junto']
}
