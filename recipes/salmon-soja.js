import { pescado } from "../mealTypes";
import { salmon } from "../ingredients/fridge";
import { soja, eneldo } from "../ingredients/pantry";

export default {
  mealType: pescado,
  name: "Salmon con soja",
  ingredients: [
    { ingredient: soja, qty: { amount: 25, units: "ml" } },
    { ingredient: eneldo },
    { ingredient: salmon, qty: { amount: 2, units: "lomos" }, tip: "sin piel" },
  ],
  steps: ["15 minutos al horno"],
};
