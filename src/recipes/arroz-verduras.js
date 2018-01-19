import { arroz } from '../mealTypes'
import { alcachofa, tomate, judiasVerdes } from '../ingredients/fridge'
import { arrozBlanco, sal, aceite, zanahoria, ajo, pimenton } from '../ingredients/pantry'

export default {
  mealType: arroz,
  name: 'Paella de verduras',
  ingredients: [
    { ingredient: sal, qty: 1},
    { ingredient: aceite, qty: 10 },
    { ingredient: ajo, qty: 200 },
    { ingredient: zanahoria, qty: 200 },
    { ingredient: alcachofa, qty: 300 },
    { ingredient: judiasVerdes, qty: 200 },
    { ingredient: tomate, qty: 100 },
    { ingredient: pimenton, qty: 10 },
    { ingredient: arrozBlanco, qty: 1000 },
  ],
  steps: ['Todo el mundo sabe como hacer paella']
}
