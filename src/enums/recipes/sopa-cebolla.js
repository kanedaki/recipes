import { ObjectId } from 'mongodb'
import { quesoRayado } from '../ingredients/fridge'
import {
  sal,
  pan,
  aceite,
  ajo,
  cebolla,
  caldoPollo,
} from '../ingredients/pantry'
import { lunch, dinner } from '../meals'
import { spring, autumn, winter } from '../seasons'

export default {
  name: 'Sopa de cebolla',
  meal: [lunch, dinner],
  seasons: [winter, autumn, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: caldoPollo, qty: 10 },
    { ingredient: cebolla, qty: 500 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da76'), qty: 50 },
    { ingredient: pan, qty: 200 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d974'), qty: 100 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
