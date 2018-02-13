import { ObjectId } from 'mongodb'
import { panceta } from '../ingredients/fridge'
import { sal, aceite, judiasBlancas, cebolla } from '../ingredients/pantry'
import { lunch } from '../meals'
import { spring, autumn, winter } from '../seasons'

export default {
  name: 'Judias blancas con panceta',
  meal: [lunch],
  seasons: [winter, autumn, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: judiasBlancas, qty: 700 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d862'), qty: 200 },
    { ingredient: cebolla, qty: 200 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
