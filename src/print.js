import moment from 'moment'
import { keys, prop } from 'ramda'
import * as meals from './businessLogic/enums/meals'
import { findIngredientById } from './repo/mongo-repo'

const daysInWeek = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo',
]

const getWeek = () => moment().week()

export const printMenu = (menu) => {
  const menupp = menu.map((day, i) => {
    const dayMenu = {
      Dia: daysInWeek[i],
    }
    keys(meals).forEach((meal) => {
      dayMenu[meal] = day[meal] ? day[meal].name : undefined
      return undefined
    })
    return dayMenu
  })
  console.log(
    `Menu para la semana ${getWeek()}`,
    JSON.stringify(menupp, null, 4),
  )
}

export const getIngredientName = async (ingredientId) => {
  const ingredient = await findIngredientById(ingredientId)
  return prop('name', ingredient)
}

export const printShoppingItem = async el => `${await getIngredientName(el.ingredient)} (${el.qty}g)`

export const printShoppingList = async (list) => {
  const listpp = await Promise.all(list.map(printShoppingItem))
  console.log('ShoppingList', JSON.stringify(listpp, null, 4))
  return true
}
