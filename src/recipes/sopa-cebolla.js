import { verduras} from "../mealTypes";
import { alcachofa, quesoRayado } from "../ingredients/fridge";
import {
  arrozBlanco,
  sal,
  pan,
  aceite,
  zanahoria,
  ajo,
  cebolla,
  caldoPollo,
} from "../ingredients/pantry";

export default {
  mealType: verduras,
  name: "Sopa de cebolla",
  ingredients: [
    { ingredient: sal, qty: 1},
    { ingredient: aceite, qty: 10 },
    { ingredient: caldoPollo, qty: 10 },
    { ingredient: cebolla, qty: 500 },
    { ingredient: ajo, qty: 50 },
    { ingredient: pan, qty: 200 },
    { ingredient: quesoRayado, qty: 100 },
  ],
  steps: ["Todo el mundo sabe como hacer paella"],
};
