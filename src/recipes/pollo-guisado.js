import { carne } from "../mealTypes";
import { pollo } from "../ingredients/fridge";
import { cebolla, caldoPollo } from "../ingredients/pantry";

export default {
  mealType: carne,
  name: "Pollo guisado",
  ingredients: [
    { ingredient: cebolla, qty: 100 },
    { ingredient: pollo, qty: 750, tip: "sin piel" },
    { ingredient: caldoPollo, qty: 1000 }
  ],
  steps: ["Guisar todo junto"],
};
