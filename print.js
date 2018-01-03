import moment from "moment";

const daysInWeek = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

const getWeek = () => moment().week();

export const printMenu = menu => {
  const menupp = menu.map(({ lunch, dinner }, i) => ({
    Dia: daysInWeek[i],
    Comida: lunch.name,
    Cena: dinner.name,
  }));
  console.log(
    `Menu para la semana ${getWeek()}`,
    JSON.stringify(menupp, null, 4),
  );
};

export const printShoppingList = list => {
  const listpp = list.map(
    el =>
      `${el.ingredient}${
        el.qty && el.qty.amount
          ? ` (${el.qty.amount} ${el.qty.units ? el.qty.units : ""})`
          : ""
      }`,
  );
  console.log("ShoppingList", JSON.stringify(listpp, null, 4));
};
