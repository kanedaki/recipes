import { ObjectId } from 'mongodb'
import { mango, salmon } from '../ingredients/fridge'
import { arrozBlanco, sal, aceite, salsaSoja } from '../ingredients/pantry'
import { dinner } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'poke',
  meal: [dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: salsaSoja, qty: 10 },
    { ingredient: salmon, qty: 500 },
    { ingredient: mango, qty: 500 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d8d2'), qty: 500 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
