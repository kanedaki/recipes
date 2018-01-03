import { verduras } from "../mealTypes";
import { judiasVerdes, tomate } from "../ingredients/fridge";
import { cebolla, aceite, ajo } from "../ingredients/pantry";

export default {
  mealType: verduras,
  name: "Judias verdes rehogadas",
  ingredients: [
    { ingredient: judiasVerdes, qty: { amount: 1, units: "kg" } },
    { ingredient: tomate, qty: { amount: 3 } },
    { ingredient: cebolla, qty: { amount: 1 } },
    { ingredient: ajo, qty: { amount: 3 } },
    { ingredient: aceite },
  ],
  steps: [
    "Pelar las judias verdes, trocear",
    "Cortar los tomates, cebolla y ajos en laminas",
    "Echar un buen chorro de aceite a la olla express y depositar capa por capa, tomate, cebolla, judias, ajo, 2 de cada. Con un chorro de aceite, sal y pimienta a mitad y al final",
    "Cocinar a fuego bajo, 10 minutos desde que la olla express esta a mitad de presion",
  ],
};
