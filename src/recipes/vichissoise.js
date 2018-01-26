import { verduras} from "../mealTypes";
import { alcachofa, puerro, nata } from "../ingredients/fridge";
import {
  arrozBlanco,
  sal,
  aceite,
  zanahoria,
  ajo,
  mantequilla,
  caldoPollo,
} from "../ingredients/pantry";

export default {
  mealType: verduras,
  name: "Vichissoise",
  ingredients: [
    { ingredient: sal, qty: 1},
    { ingredient: puerro, qty: 300 },
    { ingredient: mantequilla, qty: 30 },
    { ingredient: nata, qty: 150 },
    { ingredient: caldoPollo, qty: 250 },
  ],
  steps: ["Todo el mundo sabe como hacer paella"],
};
