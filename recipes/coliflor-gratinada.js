import { nata, coliflor, leche, queso } from "../ingredients/fridge";
import { mantequilla, harina, sal, pimientaNegra, nuezMoscada } from "pantry";

export default {
  name: "Coliflor gratinada",
  ingredients: [
    nata,
    coliflor,
    leche,
    queso,
    mantequilla,
    harina,
    sal,
    pimientaNegra,
    nuezMoscada,
  ],
  steps: [
    "Pelar, lavar y trocear la coliflor",
    "Cocer los trozos de coliflor 20 minutos",
    "Hacer la bechamel",
    "Poner en pirex la coliflor una vez escurrida. Echar la bechamel por encima",
    "Espolvorear queso rallado",
    "Gratinar al horno 10 minutos",
  ],
};
