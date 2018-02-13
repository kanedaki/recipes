import { ObjectId } from 'mongodb'
import { chorizo, panceta } from '../ingredients/fridge'
import {
  cebolla,
  patata,
  sal,
  aceite,
  lentejas,
  zanahoria,
} from '../ingredients/pantry'
import { lunch } from '../meals'
import { spring, winter, autumn } from '../seasons'

export default {
  name: 'Lentejas guisadas',
  meal: [lunch],
  seasons: [winter, autumn, spring],
  ingredients: [
    { ingredient: cebolla, qty: 100 },
    { ingredient: patata, qty: 100 },
    { ingredient: ObjectId('5a83449dd9594c4b4024da28'), qty: 1 },
    { ingredient: ObjectId('5a83449cd9594c4b4024d7e2'), qty: 10 },
    { ingredient: lentejas, qty: 500 },
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
