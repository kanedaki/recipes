import { ObjectId } from 'mongodb'
import { lunch, dinner } from '../meals'
import { summer, spring } from '../seasons'

export default {
  name: 'Gazpacho',
  meal: [lunch, dinner],
  seasons: [summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 4 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da76'), qty: 4 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da5e'), qty: 30 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da9d'), qty: 1000, tip: 'Maduro' },
    { ingredient: ObjectId('5a83449dd9594c4b4024da2a'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da9a'), qty: 50 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da98'), qty: 100 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
