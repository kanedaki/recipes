import { pasta } from "../mealTypes";
import { masaPizza, tomate } from "../ingredients/fridge";
import {
  sal,
  aceite,
  ajo,
  lataAtun,
  salsaTomate,
  aceitunas
} from "../ingredients/pantry";

export default {
  mealType: pasta,
  name: "Pizza",
  ingredients: [
    { ingredient: sal, qty: 1},
    { ingredient: aceite, qty: 10 },
    { ingredient: ajo, qty: 4 },
    { ingredient: aceitunas, qty: 50 },
    { ingredient: masaPizza, qty: 100 },
    { ingredient: lataAtun, qty: 400 },
    { ingredient: tomate, qty: 100 },
    { ingredient: salsaTomate, qty: 100 },
  ],
  steps: ["Todo el mundo sabe como hacer paella"],
};
