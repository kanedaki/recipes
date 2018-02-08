import { pollo } from '../ingredients/fridge'
import { cebolla, caldoPollo, ajo } from '../ingredients/pantry'
import { lunch, dinner } from '../meals'
import { spring, summer, autumn, winter } from '../seasons'

export default {
  name: 'Pollo guisado',
  meal: [lunch, dinner],
  seasons: [winter, autumn, summer, spring],
  ingredients: [
    { ingredient: cebolla, qty: 100 },
    { ingredient: ajo, qty: 10 },
    { ingredient: pollo, qty: 750, tip: 'contramuslos sin piel' },
    { ingredient: caldoPollo, qty: 1000 },
  ],
  steps: ['Guisar todo junto'],
}
