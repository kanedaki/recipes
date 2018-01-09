import { legumbres } from "../mealTypes";
import { chorizo, panceta } from "../ingredients/fridge";
import {
  cebolla,
  patata,
  sal,
  aceite,
  lentejas,
  zanahoria,
  ajo,
} from "../ingredients/pantry";

export default {
  mealType: legumbres,
  name: "Lentejas guisadas",
  ingredients: [
    { ingredient: cebolla, qty: { amount: 1 } },
    { ingredient: patata, qty: { amount: 1 } },
    { ingredient: sal },
    { ingredient: aceite },
    { ingredient: lentejas, qty: { amount: 1, units: "kg" } },
    { ingredient: zanahoria, qty: { amount: 1 } },
    { ingredient: chorizo, qty: { amount: 1 } },
    { ingredient: panceta, qty: { amount: 1, units: "lonchas" } },
  ],
  steps: [
    "Poner las lentejas en agua, al menos 4 horas antes",
    "Cortar la panceta en trozos pequeños",
    "Saltear la panceta, reservar",
    "Cortar las verduras en trozos pequeños",
    "Hacer un sofrito con las verduras",
    "Añadir las lentejas, el chorizo, la panceta y cubrir con agua",
  ],
};
