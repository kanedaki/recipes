import { ObjectId } from 'mongodb'
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
    { ingredient: ObjectId('5a83449cd9594c4b4024d7f0'), qty: 50 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da0d'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d9eb'), qty: 400 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da9d'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da72'), qty: 100 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
