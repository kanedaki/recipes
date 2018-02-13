import { ObjectId } from 'mongodb'
import { breakfast, afternoonSnack } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Batido de fresa',
  meal: [breakfast, afternoonSnack],
  seasons: [winter, autumn, summer, spring],
  ingredients: [{ ingredient: ObjectId('5a83449dd9594c4b4024d953'), qty: 1 }, { ingredient: ObjectId('5a83449dd9594c4b4024d911'), qty: 1 }],
  steps: ['batir todo junto'],
}
