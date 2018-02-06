import { verduras } from '../mealTypes'
import {
  alcachofa,
  calabacin,
  pollo,
  pimientoRojo,
} from '../ingredients/fridge'
import { sal, aceite, zanahoria, ajo, cebolla } from '../ingredients/pantry'
import { lunch, dinner } from '../meals'

export default {
  mealType: verduras,
  name: 'Wok de verduras',
  meal: [lunch, dinner],
  ingredients: [
    { ingredient: sal, qty: 1 },
    { ingredient: aceite, qty: 10 },
    { ingredient: zanahoria, qty: 200 },
    { ingredient: calabacin, qty: 200 },
    { ingredient: pollo, qty: 200 },
    { ingredient: ajo, qty: 200 },
    { ingredient: pimientoRojo, qty: 200 },
    { ingredient: cebolla, qty: 200 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
