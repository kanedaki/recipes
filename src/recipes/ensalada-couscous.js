import { legumbres} from "../mealTypes";
import { rucula, tomateSeco } from "../ingredients/fridge";
import {
  sal,
  aceite,
  garbanzos,
  couscous,
  pipasCalabaza,
} from "../ingredients/pantry";

export default {
  mealType: legumbres,
  name: "Ensalada de cous cous",
  ingredients: [
    { ingredient: sal, qty: 1},
    { ingredient: aceite, qty: 10 },
    { ingredient: garbanzos, qty: 300 },
    { ingredient: couscous, qty: 200 },
    { ingredient: rucula, qty: 200 },
    { ingredient: tomateSeco, qty: 50 },
    { ingredient: pipasCalabaza, qty: 20 },
  ],
  steps: ["Todo el mundo sabe como hacer paella"],
};
