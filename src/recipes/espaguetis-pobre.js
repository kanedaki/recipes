import { pasta } from "../mealTypes";
import { parmesano } from "../ingredients/fridge";
import { espaguetis, ajo, aceite, cayena } from "../ingredients/pantry";

export default {
  mealType: pasta,
  name: "Espaguetis a lo pobre",
  ingredients: [
    { ingredient: espaguetis, qty: 500 },
    { ingredient: ajo, qty: 50 },
    { ingredient: aceite, qty: 10 },
    { ingredient: parmesano, qty: 100 },
  ],
  steps: [
    "Cocer la pasta",
    "Sofreir ajos fuego medio, con la cayena",
    "Anadir los espaguetis, retirar del fuego y remover",
    "Rayar parmesano por encima",
  ],
};
