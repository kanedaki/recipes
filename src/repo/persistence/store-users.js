import { insertUser, getUser } from '../mongo-repo'
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


Promise.all([insertUser('kanedaki', description1, template1),
  insertUser('storresm', description2, template2)])
  .then(() => getUser('kanedaki'))
  .then(() => process.exit())

