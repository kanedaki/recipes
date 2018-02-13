import { ObjectId } from 'mongodb'
import { parmesano } from '../ingredients/fridge'
import { espaguetis, ajo, aceite } from '../ingredients/pantry'
import { lunch, dinner } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Espaguetis a lo pobre',
  meal: [lunch, dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: espaguetis, qty: 500 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da76'), qty: 50 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: parmesano, qty: 100 },
  ],
  steps: [
    'Cocer la pasta',
    'Sofreir ajos fuego medio, con la cayena',
    'Anadir los espaguetis, retirar del fuego y remover',
    'Rayar parmesano por encima',
  ],
}
