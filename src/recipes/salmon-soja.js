import { pescado } from "../mealTypes";
import { salmon } from "../ingredients/fridge";
import { soja, eneldo } from "../ingredients/pantry";

export default {
  mealType: pescado,
  name: "Salmon con soja",
  ingredients: [
    { ingredient: soja, qty: 25 },
    { ingredient: eneldo, qty: 1 },
    { ingredient: salmon, qty: 500, tip: "sin piel" },
  ],
  steps: ["15 minutos al horno"],
};
