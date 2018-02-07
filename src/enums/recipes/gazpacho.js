import { verduras } from '../mealTypes'
import { pepino, tomate, pimientoVerde } from '../ingredients/fridge'
import { sal, aceite, vinagre, zanahoria, ajo } from '../ingredients/pantry'
import { lunch, dinner } from '../meals'
import { summer, spring } from '../seasons'

export default {
  mealType: verduras,
  name: 'Gazpacho',
  meal: [lunch, dinner],
  seasons: [summer, spring],
  ingredients: [
    { ingredient: sal, qty: 4 },
    { ingredient: ajo, qty: 4 },
    { ingredient: aceite, qty: 100 },
    { ingredient: zanahoria, qty: 30 },
    { ingredient: tomate, qty: 1000, tip: 'Maduro' },
    { ingredient: vinagre, qty: 10 },
    { ingredient: pimientoVerde, qty: 50 },
    { ingredient: pepino, qty: 100 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
