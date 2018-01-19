import { verduras } from "../mealTypes";
import { judiasVerdes, tomate, espinacas } from "../ingredients/fridge";
import { cebolla, aceite, ajo } from "../ingredients/pantry";

export default {
  mealType: verduras,
  name: "Judias verdes rehogadas",
  ingredients: [
    { ingredient: judiasVerdes, qty: 1000 },
    { ingredient: tomate, qty:  100 },
    { ingredient: cebolla, qty: 100 },
    { ingredient: ajo, qty: 30 },
    { ingredient: aceite, qty: 10 },
    { ingredient: espinacas, qty: 100 },
  ],
  steps: [
    "Pelar las judias verdes, trocear",
    "Cortar los tomates, cebolla y ajos en laminas",
    "Echar un buen chorro de aceite a la olla express y depositar capa por capa, tomate, cebolla, judias, ajo, 2 de cada. Con un chorro de aceite, sal y pimienta a mitad y al final",
    "Cocinar a fuego bajo, 10 minutos desde que la olla express esta a mitad de presion",
  ],
};
