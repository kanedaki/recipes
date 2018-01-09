import { pasta } from "../mealTypes";
import { parmesano } from "../ingredients/fridge";
import { espaguetis, ajo, aceite, cayena } from "../ingredients/pantry";

export default {
  mealType: pasta,
  name: "Espaguetis a lo pobre",
  ingredients: [
    { ingredient: espaguetis, qty: { amount: 500, units: "g" } },
    { ingredient: ajo, qty: { amount: 5 } },
    { ingredient: aceite },
    { ingredient: parmesano, qty: { amount: 100, units: "g" } },
  ],
  steps: [
    "Cocer la pasta",
    "Sofreir ajos fuego medio, con la cayena",
    "Anadir los espaguetis, retirar del fuego y remover",
    "Rayar parmesano por encima",
  ],
};
