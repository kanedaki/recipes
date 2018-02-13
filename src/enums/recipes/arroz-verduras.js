import { ObjectId } from 'mongodb'
import { lunch, dinner } from '../meals'
import { winter, autumn, summer, spring } from '../seasons'

export default {
  name: 'Paella de verduras',
  meal: [lunch, dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da76'), qty: 200 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da5e'), qty: 200 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da77'), qty: 300 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da95'), qty: 200 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da9d'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da25'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d8d2'), qty: 1000 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
