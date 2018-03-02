import { createBalancedMenu } from './businessLogic/menu'
import { createShoppingList } from './businessLogic/shoppingList'
import { printMenu, printShoppingList } from './print'
import connectToDB from './repo/mongo-repo'
import serviceFactory from './services'


const username = 'kanedaki'

const main = async () => {
  const db = await connectToDB()
  const services = serviceFactory({}, db)
  const menu = await services.createMenu(username)
  await db.insertUserMenu(username, menu)
  const userMenu = await db.getUserMenu(username)
  printMenu(userMenu)
  const list = await createShoppingList(userMenu)
  await db.insertUserShoppingList(username, list)
  const userList = await db.getUserShoppingList(username)
  printShoppingList(userList)

}

main().then(() => process.exit())
