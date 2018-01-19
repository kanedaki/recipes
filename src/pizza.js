import { verduras } from "../mealTypes";
import { alcachofa } from "../ingredients/fridge";
import {
  arrozBlanco,
  sal,
  aceite,
  zanahoria,
  ajo,
} from "../ingredients/pantry";

export default {
  mealType: verduras,
  name: "Pizza",
  ingredients: [
    { ingredient: sal, qty: 1},
    { ingredient: aceite, qty: 10 },
    { ingredient: zanahoria, qty: 300 },
    { ingredient: alcachofa, qty: 400 },
    { ingredient: arrozBlanco, qty: 1000 },
  ],
  steps: ["Todo el mundo sabe como hacer paella"],
};
