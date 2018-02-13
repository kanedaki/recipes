import { ObjectId } from 'mongodb'
import { masaPizza, tomate } from '../ingredients/fridge'
import {
  sal,
  aceite,
  ajo,
  lataAtun,
  salsaTomate,
  aceitunas,
} from '../ingredients/pantry'
import { dinner } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Pizza',
  meal: [dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da76'), qty: 4 },
    { ingredient: aceitunas, qty: 50 },
    { ingredient: masaPizza, qty: 100 },
    { ingredient: lataAtun, qty: 400 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da9d'), qty: 100 },
    { ingredient: salsaTomate, qty: 100 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
