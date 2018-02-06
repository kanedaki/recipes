import { legumbres } from '../mealTypes'
import { chorizo, panceta } from '../ingredients/fridge'
import {
  cebolla,
  patata,
  sal,
  aceite,
  lentejas,
  zanahoria,
  ajo,
} from '../ingredients/pantry'
import { lunch } from '../meals'

export default {
  mealType: legumbres,
  name: 'Lentejas guisadas',
  meal: [lunch],
  ingredients: [
    { ingredient: cebolla, qty: 100 },
    { ingredient: patata, qty: 100 },
    { ingredient: sal, qty: 1 },
    { ingredient: aceite, qty: 10 },
    { ingredient: lentejas, qty: 500 },
    { ingredient: zanahoria, qty: 100 },
    { ingredient: chorizo, qty: 100 },
    { ingredient: panceta, qty: 100 },
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
