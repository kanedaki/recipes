import { createMenu } from "./recipes";
import {getShoppingList} from "./shoppingList";
import normalTemplate from "./templates/normal";
import { printMenu, printShoppingList } from "./print";

const menu = createMenu(normalTemplate);
printMenu(menu);
const list = getShoppingList(menu);
printShoppingList(list);
