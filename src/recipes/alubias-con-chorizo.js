import { legumbres } from '../mealTypes'
import { alcachofa, chorizo, panceta, puerro } from '../ingredients/fridge'
import {
  arrozBlanco,
  sal,
  aceite,
  zanahoria,
  ajo,
  cebolla,
  judiasPintas,
  caldoPollo,
} from '../ingredients/pantry'
import { lunch } from '../meals'

export default {
  mealType: legumbres,
  name: 'Alubias rojas con chorizo',
  meal: [lunch],
  ingredients: [
    { ingredient: sal, qty: 1 },
    { ingredient: aceite, qty: 10 },
    { ingredient: chorizo, qty: 100 },
    { ingredient: panceta, qty: 100 },
    { ingredient: judiasPintas, qty: 500 },
    { ingredient: caldoPollo, qty: 500 },
    { ingredient: puerro, qty: 100 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
