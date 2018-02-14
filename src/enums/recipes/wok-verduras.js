import { ObjectId } from 'mongodb'
import { lunch, dinner } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Wok de verduras',
  meal: [lunch, dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da5e'), qty: 200 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da86'), qty: 200 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d854'), qty: 200, tip: 'Mejor contramuslos sin piel ni hueso' },
    { ingredient: ObjectId('5a83449dd9594c4b4024da76'), qty: 200 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da99'), qty: 200 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da89'), qty: 200 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
