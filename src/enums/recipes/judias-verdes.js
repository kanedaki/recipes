import { ObjectId } from 'mongodb'
import { lunch, dinner } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Judias verdes rehogadas',
  meal: [lunch, dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da95'), qty: 1000 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da9d'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da89'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da76'), qty: 30 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da91'), qty: 100 },
  ],
  steps: [
    'Pelar las judias verdes, trocear',
    'Cortar los tomates, cebolla y ajos en laminas',
    'Echar un buen chorro de aceite a la olla express y depositar capa por capa, tomate, cebolla, judias, ajo, 2 de cada. Con un chorro de aceite, sal y pimienta a mitad y al final',
    'Cocinar a fuego bajo, 10 minutos desde que la olla express esta a mitad de presion',
  ],
}
