import { createBalancedMenu } from './businessLogic/menu'
import { createShoppingList } from './businessLogic/shoppingList'
import { printMenu, printShoppingList } from './print'
import { insertUserMenu, insertUserShoppingList, getUserMenu, getUserShoppingList } from './repo/mongo-repo'


const username = 'kanedaki'

const main = async () => {
  const menu = await createBalancedMenu(username)
  await insertUserMenu(username, menu)
  const userMenu = await getUserMenu(username)
  printMenu(userMenu)

  const list = await createShoppingList(userMenu)
  await insertUserShoppingList(username, list)
  const userList = await getUserShoppingList(username)
  printShoppingList(userList)
}

main().then(() => process.exit())
