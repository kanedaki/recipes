import {
  verduras,
  pasta,
  legumbres,
  pescado,
  arroz,
  carne,
} from "../mealTypes";

export default [
  { lunch: pasta, dinner: verduras },
  { lunch: legumbres, dinner: pescado },
  { lunch: arroz, dinner: verduras },
  { lunch: verduras, dinner: carne },
  { lunch: legumbres, dinner: arroz },
];
