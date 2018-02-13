import { ObjectId } from 'mongodb'
import { tomate, bacalao } from '../ingredients/fridge'
import { aceite, salsaSoja, cebolla } from '../ingredients/pantry'
import { lunch } from '../meals'
import { spring, summer, autumn } from '../seasons'

export default {
  name: 'Ensalada judias blancas',
  meal: [lunch],
  seasons: [autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d9d5'), qty: 300, tip: 'Desmigado' },
    { ingredient: ObjectId('5a83449dd9594c4b4024da9d'), qty: 200 },
    { ingredient: cebolla, qty: 100 },
    { ingredient: salsaSoja, qty: 10 },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
