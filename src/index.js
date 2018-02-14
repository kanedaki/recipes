import { createBalancedMenu } from './businessLogic/menu'
import { getShoppingList } from './businessLogic/shoppingList'
import { printMenu, printShoppingList } from './print'
import { getUser } from './repo/mongo-repo'


const username = 'kanedaki'

const main = async () => {
  const { template, description } = await getUser(username)
  const menu = await createBalancedMenu(template, description)
  printMenu(menu)
  const list = getShoppingList(menu)
  return printShoppingList(list)
}

main().then(() => process.exit())
