import { fruta } from "../mealTypes";
import { fresas } from "../ingredients/fridge";
import { leche } from "../ingredients/pantry";

export default {
  mealType: fruta,
  name: "Batido de fresa",
  ingredients: [
    { ingredient: leche, qty: { amount: 1, units: "l" } },
    { ingredient: fresas, qty: { amount: "1", units: "kg" } },
  ],
  steps: ["batir todo junto"],
};
