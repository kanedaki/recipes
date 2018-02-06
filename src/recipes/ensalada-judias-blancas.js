import { legumbres } from '../mealTypes'
import { tomate, bacalao } from '../ingredients/fridge'
import { aceite, salsaSoja, cebolla } from '../ingredients/pantry'
import { lunch } from '../meals'
import { spring, summer, autumn } from '../seasons'

export default {
  mealType: legumbres,
  name: 'Ensalada judias blancas',
  meal: [lunch],
  seasons: [autumn, summer, spring],
  ingredients: [
    { ingredient: aceite, qty: 10 },
    { ingredient: bacalao, qty: 300, tip: 'Desmigado' },
    { ingredient: tomate, qty: 200 },
    { ingredient: cebolla, qty: 100 },
    { ingredient: salsaSoja, qty: 10 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
