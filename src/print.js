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

export const printShoppingItem = el => console.log(el) || `${el.ingredient.name} (${el.qty}g)`

export const printShoppingList = list => {
  const listpp = list.map(printShoppingItem) 
  console.log("ShoppingList", JSON.stringify(listpp, null, 4));
};
