import { ObjectId } from 'mongodb'
import { lunch, dinner } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Pollo guisado',
  meal: [lunch, dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da89'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da76'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d854'), qty: 750, tip: 'contramuslos sin piel' },
    { ingredient: ObjectId('5a83449dd9594c4b4024d832'), qty: 1000 },
  ],
  steps: ['Guisar todo junto'],
}
