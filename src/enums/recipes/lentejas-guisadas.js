import { ObjectId } from 'mongodb'
import { lunch } from '../meals'
import { spring, winter, autumn } from '../seasons'

export default {
  name: 'Lentejas guisadas',
  meal: [lunch],
  seasons: [winter, autumn, spring],
  ingredients: [
    { ingredient: ObjectId('5a83449dd9594c4b4024da89'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da5a'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d9aa'), qty: 500 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da5e'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d86c'), qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024d862'), qty: 100 },
  ],
  steps: [
    'Poner las lentejas en agua, al menos 4 horas antes',
    'Cortar la panceta en trozos pequeños',
    'Saltear la panceta, reservar',
    'Cortar las verduras en trozos pequeños',
    'Hacer un sofrito con las verduras',
    'Añadir las lentejas, el chorizo, la panceta y cubrir con agua',
  ],
}
