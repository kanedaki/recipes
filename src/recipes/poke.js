import { pescado} from "../mealTypes";
import { mango, salmon } from "../ingredients/fridge";
import {
  arrozBlanco,
  sal,
  aceite,
  ajo,
  salsaSoja,
} from "../ingredients/pantry";

export default {
  mealType: pescado,
  name: "poke",
  ingredients: [
    { ingredient: sal, qty: 1},
    { ingredient: aceite, qty: 10 },
    { ingredient: salsaSoja, qty: 10 },
    { ingredient: salmon, qty: 500 },
    { ingredient: mango, qty: 500 },
    { ingredient: arrozBlanco, qty: 500 },
  ],
  steps: ["Todo el mundo sabe como hacer paella"],
};
