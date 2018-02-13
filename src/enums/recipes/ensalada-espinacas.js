import { ObjectId } from 'mongodb'
import { lunch, dinner } from '../meals'
import { spring, summer, autumn } from '../seasons'

export default {
  name: 'Ensalada de espinacas',
  meal: [lunch, dinner],
  seasons: [autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da91'), qty: 300 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d982'), qty: 150 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d93c'), qty: 60 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da96'), qty: 100, tip: 'Tomate seco' },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
