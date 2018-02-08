import { fresas } from '../ingredients/fridge'
import { leche } from '../ingredients/pantry'
import { breakfast, afternoonSnack } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Batido de fresa',
  meal: [breakfast, afternoonSnack],
  seasons: [winter, autumn, summer, spring],
  ingredients: [{ ingredient: leche, qty: 1 }, { ingredient: fresas, qty: 1 }],
  steps: ['batir todo junto'],
}
