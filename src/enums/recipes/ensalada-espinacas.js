import { espinacas, roquefort, tomateSeco } from '../ingredients/fridge'
import { sal, aceite, nueces } from '../ingredients/pantry'
import { lunch, dinner } from '../meals'
import { spring, summer, autumn } from '../seasons'

export default {
  name: 'Ensalada de espinacas',
  meal: [lunch, dinner],
  seasons: [autumn, summer, spring],
  ingredients: [
    { ingredient: sal, qty: 1 },
    { ingredient: aceite, qty: 10 },
    { ingredient: espinacas, qty: 300 },
    { ingredient: roquefort, qty: 150 },
    { ingredient: nueces, qty: 60 },
    { ingredient: tomateSeco, qty: 100 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
