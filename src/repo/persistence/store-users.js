import db from '../mongo-repo'
import { lunch, dinner, breakfast } from '../../businessLogic/enums/meals'
import { light, none } from '../../businessLogic/enums/activity'
import { male, female } from '../../businessLogic/enums/sex'


const template1 = [
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true },
]


const template2 = [
  { [lunch]: true, [dinner]: true, [breakfast]: true },
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true },
  { [lunch]: true, [dinner]: true },
]


const description1 = {
  activity: light,
  sex: male,
  age: 34,
  height: 185,
  weight: 85,
}

const description2 = {
  activity: none,
  sex: female,
  age: 35,
  height: 175,
  weight: 65,
}

async function storeUsers() {
  const { getUser, insertUser, insertUserSettings, updateUser } = await db()
  await Promise.all([
    insertUser('kanedaki', "$2a$10$xDeyxS8dQ2HVYxhfWNVRrusYY6BojZfiv/ElKvMMXQ3ii0OjL2i.6", "kanedaki@gmail.com"),
    insertUser('saruku', "$2a$10$xDeyxS8dQ2HVYxhfWNVRrusYY6BojZfiv/ElKvMMXQ3ii0OjL2i.6", "storresm08@gmail.com")
  ])
  await Promise.all([
    updateUser('kanedaki', description1),
    updateUser('storresm', description2)
  ])
  await Promise.all([
    insertUserSettings('kanedaki', { template: template1 }),
    insertUserSettings('storresm', { template: template2 })
  ])
  process.exit()
}

storeUsers()

