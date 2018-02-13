import { ObjectId } from 'mongodb'
import { salmon } from '../ingredients/fridge'
import { salsaSoja, eneldo } from '../ingredients/pantry'
import { dinner, lunch } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Salmon con soja',
  meal: [dinner, lunch],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: salsaSoja, qty: 25 },
    { ingredient: eneldo, qty: 1 },
    { ingredient: salmon, qty: 500, tip: 'sin piel' },
  ],
  steps: ['15 minutos al horno'],
}
