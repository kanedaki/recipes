import { verduras } from '../mealTypes'
import { nata, coliflor, leche, quesoRayado } from '../ingredients/fridge'
import {
  mantequilla,
  harina,
  sal,
  pimientaNegra,
  nuezMoscada,
} from '../ingredients/pantry'
import { lunch, dinner } from '../meals'

export default {
  mealType: verduras,
  name: 'Coliflor gratinada',
  meal: [lunch, dinner],
  ingredients: [
    { ingredient: nata, qty: 100 },
    { ingredient: coliflor, qty: 1000 },
    { ingredient: leche, qty: 750 },
    { ingredient: quesoRayado, qty: 100 },
    { ingredient: mantequilla, qty: 150 },
    { ingredient: harina, qty: 150 },
    { ingredient: sal, qty: 1 },
    { ingredient: pimientaNegra, qty: 1 },
    { ingredient: nuezMoscada, qty: 1 },
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
