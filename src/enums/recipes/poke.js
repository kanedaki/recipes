import { mango, salmon } from '../ingredients/fridge'
import { arrozBlanco, sal, aceite, ajo, salsaSoja } from '../ingredients/pantry'
import { dinner } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'poke',
  meal: [dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: sal, qty: 1 },
    { ingredient: aceite, qty: 10 },
    { ingredient: salsaSoja, qty: 10 },
    { ingredient: salmon, qty: 500 },
    { ingredient: mango, qty: 500 },
    { ingredient: arrozBlanco, qty: 500 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
