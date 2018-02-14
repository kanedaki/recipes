import { createBalancedMenu } from './businessLogic/menu'
import { getShoppingList } from './businessLogic/shoppingList'
import { printMenu, printShoppingList } from './print'


const username = 'kanedaki'

const main = async () => {
  const menu = await createBalancedMenu(username)
  printMenu(menu)
  const list = getShoppingList(menu)
  return printShoppingList(list)
}

main().then(() => process.exit())
