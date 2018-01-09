import { verduras } from "../mealTypes";
import { nata, coliflor, leche, queso } from "../ingredients/fridge";
import {
  mantequilla,
  harina,
  sal,
  pimientaNegra,
  nuezMoscada,
} from "../ingredients/pantry";

export default {
  mealType: verduras,
  name: "Coliflor gratinada",
  ingredients: [
    { ingredient: nata, qty: { amount: 100, units: "ml" } },
    { ingredient: coliflor, qty: { amount: 1 } },
    { ingredient: leche, qty: { amount: 1, units: "l" } },
    { ingredient: queso, qty: { amount: 100, units: "g" } },
    { ingredient: mantequilla, qty: { amount: 150, units: "g" } },
    { ingredient: harina, qty: { amount: 150, units: "g" } },
    { ingredient: sal },
    { ingredient: pimientaNegra },
    { ingredient: nuezMoscada },
  ],
  steps: [
    "Pelar, lavar y trocear la coliflor",
    "Cocer los trozos de coliflor 20 minutos",
    "Hacer la bechamel",
    "Poner en pirex la coliflor una vez escurrida. Echar la bechamel por encima",
    "Espolvorear queso rallado",
    "Gratinar al horno 10 minutos",
  ],
};
