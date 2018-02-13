import { ObjectId } from 'mongodb'
import { lunch } from '../meals'
import { autumn, winter } from '../seasons'

export default {
  name: 'Alubias rojas con chorizo',
  meal: [lunch],
  seasons: [winter, autumn],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d86c'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d862'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d9a9'), qty: 500 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d832'), qty: 500 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da9b'), qty: 100 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
