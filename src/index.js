import { createBalancedMenu } from './menu'
import { getShoppingList } from './shoppingList'
import normalTemplate from './enums/templates/normal'
import { printMenu, printShoppingList } from './print'

const user = {
  activity: 'light',
  sex: 'male',
  age: 34,
  height: 185,
  weight: 85,
}
const menu = createBalancedMenu(normalTemplate, user)
printMenu(menu)

const list = getShoppingList(menu)
printShoppingList(list)
