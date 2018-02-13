import { ObjectId } from 'mongodb'
import { lunch, dinner } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Coliflor gratinada',
  meal: [lunch, dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024d95c'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da8d'), qty: 1000 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d953'), qty: 750 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d974'), qty: 100 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e5'), qty: 150 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d8d9'), qty: 150 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da27'), qty: 1 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da22'), qty: 1 },
  ],
  steps: [
    'Pelar, lavar y trocear la coliflor',
    'Cocer los trozos de coliflor 20 minutos',
    'Hacer la bechamel',
    'Poner en pirex la coliflor una vez escurrida. Echar la bechamel por encima',
    'Espolvorear queso rallado',
    'Gratinar al horno 10 minutos',
  ],
}
