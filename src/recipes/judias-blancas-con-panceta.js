import { legumbres } from '../mealTypes'
import { panceta } from '../ingredients/fridge'
import { sal, aceite, judiasBlancas, cebolla } from '../ingredients/pantry'
import { lunch } from '../meals'
import { spring, autumn, winter } from '../seasons'

export default {
  mealType: legumbres,
  name: 'Judias blancas con panceta',
  meal: [lunch],
  seasons: [winter, autumn, spring],
  ingredients: [
    { ingredient: sal, qty: 1 },
    { ingredient: aceite, qty: 10 },
    { ingredient: judiasBlancas, qty: 700 },
    { ingredient: panceta, qty: 200 },
    { ingredient: cebolla, qty: 200 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
