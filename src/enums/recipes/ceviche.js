import { ObjectId } from 'mongodb'
import { dinner } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Ceviche',
  meal: [dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 5 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 20 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d918'), qty: 500 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da1e'), qty: 2, tip: 'Aji' },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7f0'), qty: 50 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d8dc'), qty: 100, tip: 'Choclo' },
    { ingredient: ObjectId('5a83449dd9594c4b4024d908'), qty: 200 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d91c'), qty: 200 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da89'), qty: 200, tip: 'Si es morada mejor' },
    {
      ingredient: ObjectId('5a83449dd9594c4b4024d9dc'),
      qty: 1000,
      tip:
        'Sirve cualquier pescado blanco, como corvina, lenguado. El salmon tambien va muy bien',
    },
  ],
  steps: ['Todo el mundo sabe como hacer paella'],
}
