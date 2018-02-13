import { ObjectId } from 'mongodb'
import { puerro, nata } from '../ingredients/fridge'
import {
  sal,
  mantequilla,
  caldoPollo,
} from '../ingredients/pantry'
import { lunch, dinner } from '../meals'
import { spring, summer, autumn } from '../seasons'

export default {
  name: 'Vichissoise',
  meal: [lunch, dinner],
  seasons: [autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da9b'), qty: 300 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e5'), qty: 30 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d95c'), qty: 150 },
    { ingredient: caldoPollo, qty: 250 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
