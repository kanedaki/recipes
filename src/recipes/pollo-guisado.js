import { carne } from "../mealTypes";
import { pollo } from "../ingredients/fridge";
import { cebolla, caldoPollo } from "../ingredients/pantry";

export default {
  mealType: carne,
  name: "Pollo guisado",
  ingredients: [
    { ingredient: cebolla, qty: { amount: 1 } },
    {
      ingredient: pollo,
      qty: { amount: 4, units: "contramuslos" },
      tip: "sin piel",
    },
    { ingredient: caldoPollo, qty: { amount: 1, units: "l" } },
  ],
  steps: ["Guisar todo junto"],
};
