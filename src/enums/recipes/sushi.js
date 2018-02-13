import { ObjectId } from 'mongodb'
import { pepino, aguacate, salmon } from '../ingredients/fridge'
import {
  arrozBlanco,
  zanahoria,
  salsaSoja,
  azucar,
  vinagreArroz,
  algaNori,
} from '../ingredients/pantry'
import { lunch, dinner } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Sushi (makis, sandwiches o conos)',
  meal: [lunch, dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da5e'), qty: 300 },
    { ingredient: salsaSoja, qty: 30 },
    { ingredient: pepino, qty: 400 },
    { ingredient: aguacate, qty: 1000 },
    { ingredient: salmon, qty: 200, tip: 'Atun u otros pescados' },
    { ingredient: ObjectId('5a83449dd9594c4b4024d8d2'), qty: 400 },
    { ingredient: vinagreArroz, qty: 40 },
    { ingredient: azucar, qty: 20 },
    { ingredient: algaNori, qty: 10 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
