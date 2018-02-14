import { ObjectId } from 'mongodb'
import { lunch, dinner } from '../meals'
import { spring, autumn, winter } from '../seasons'

export default {
  name: 'Sopa de cebolla',
  meal: [lunch, dinner],
  seasons: [winter, autumn, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d832'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da89'), qty: 500 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da76'), qty: 50 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d8e9'), qty: 200 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d974'), qty: 100 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
