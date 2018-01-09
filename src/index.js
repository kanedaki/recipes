import { createMenu } from "./recipes";
import shoppingList from "./shoppingList";
import normalTemplate from "./templates/normal";
import { printMenu, printShoppingList } from "./print";

const menu = createMenu(normalTemplate);
printMenu(menu);
const list = shoppingList(menu);
printShoppingList(list);
