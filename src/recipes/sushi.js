import { arroz } from "../mealTypes";
import { alcachofa, pepino, aguacate, salmon } from "../ingredients/fridge";
import {
  arrozBlanco,
  sal,
  aceite,
  zanahoria,
  ajo,
  salsaSoja,
  azucar,
  vinagreArroz,
  algaNori
} from "../ingredients/pantry";

export default {
  mealType: arroz,
  name: "Sushi (makis, sandwiches o conos)",
  ingredients: [
    { ingredient: zanahoria, qty: 300 },
    { ingredient: salsaSoja, qty: 30 },
    { ingredient: pepino, qty: 400 },
    { ingredient: aguacate, qty: 1000 },
    { ingredient: salmon, qty: 200, tip: "Atun u otros pescados" },
    { ingredient: arrozBlanco, qty: 400 },
    { ingredient: vinagreArroz, qty: 40 },
    { ingredient: azucar, qty: 20 },
    { ingredient: algaNori, qty: 10 },
  ],
  steps: ["Todo el mundo sabe como hacer paella"],
};
