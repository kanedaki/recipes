import { ObjectId } from 'mongodb'
import { lunch, dinner } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Sushi (makis, sandwiches o conos)',
  meal: [lunch, dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da5e'), qty: 300 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da38'), qty: 30 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da98'), qty: 400 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d908'), qty: 1000 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d9ce'), qty: 200, tip: 'Atun u otros pescados' },
    { ingredient: ObjectId('5a83449dd9594c4b4024d8d2'), qty: 400 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da2a'), qty: 40, tip: 'Vinagre de arroz' },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7fe'), qty: 20 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da7f'), qty: 10, tip: 'Alga nori' },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
