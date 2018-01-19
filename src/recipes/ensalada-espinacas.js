import { verduras } from "../mealTypes";
import { espinacas, roquefort, tomateSeco } from "../ingredients/fridge";
import {
  sal,
  aceite,
  nueces
} from "../ingredients/pantry";

export default {
  mealType: verduras,
  name: "Ensalada de espinacas",
  ingredients: [
    { ingredient: sal, qty: 1},
    { ingredient: aceite, qty: 10 },
    { ingredient: espinacas, qty: 300 },
    { ingredient: roquefort, qty: 150 },
    { ingredient: nueces, qty: 60 },
    { ingredient: tomateSeco, qty: 100 },
  ],
  steps: ["Todo el mundo sabe como hacer paella"],
};
