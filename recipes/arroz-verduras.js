import { arroz } from "../mealTypes";
import { alcachofa } from "../ingredients/fridge";
import {
  arrozBlanco,
  sal,
  aceite,
  zanahoria,
  ajo,
} from "../ingredients/pantry";

export default {
  mealType: arroz,
  name: "Paella de verduras",
  ingredients: [
    { ingredient: sal },
    { ingredient: aceite },
    { ingredient: zanahoria, qty: { amount: "3" } },
    { ingredient: alcachofa, qty: { amount: "4" } },
    { ingredient: arrozBlanco, qty: { amount: "50", units: "g" } },
  ],
  steps: ["Todo el mundo sabe como hacer paella"],
};
