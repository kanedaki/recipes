import { createMenu } from './menu'
import { getShoppingList } from './shoppingList'
import normalTemplate from './enums/templates/normal'
import { printMenu, printShoppingList } from './print'

const menu = createMenu(normalTemplate)
printMenu(menu)
const list = getShoppingList(menu)
printShoppingList(list)
