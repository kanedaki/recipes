import { ObjectId } from 'mongodb'
import { lunch, dinner } from '../meals'
import { spring, summer, autumn } from '../seasons'

export default {
  name: 'Ensalada de cous cous',
  meal: [lunch, dinner],
  seasons: [autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d9a5'), qty: 300 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d8e0'), qty: 200 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da96'), qty: 200, tip: 'Rúcula' },
    { ingredient: ObjectId('5a83449dd9594c4b4024da96'), qty: 50, tip: 'Tomate seco' },
    { ingredient: ObjectId('5a83449dd9594c4b4024d941'), qty: 20, tip: 'Pipas de calabaza mejor' },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
