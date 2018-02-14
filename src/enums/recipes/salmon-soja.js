import { ObjectId } from 'mongodb'
import { dinner, lunch } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Salmon con soja',
  meal: [dinner, lunch],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da38'), qty: 25 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d9ce'), qty: 500, tip: 'sin piel' },
  ],
  steps: ['15 minutos al horno'],
}
