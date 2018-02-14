import { createBalancedMenu } from './businessLogic/menu'
import { getShoppingList } from './businessLogic/shoppingList'
import normalTemplate from './businessLogic/enums/templates/normal'
import { printMenu, printShoppingList } from './print'

const user = {
  activity: 'light',
  sex: 'male',
  age: 34,
  height: 185,
  weight: 85,
}

const main = async () => {
  const menu = await createBalancedMenu(normalTemplate, user)
  printMenu(menu)
  const list = getShoppingList(menu)
  return printShoppingList(list)
}

main().then(() => process.exit())
