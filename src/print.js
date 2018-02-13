import moment from 'moment'
import { keys } from 'ramda'
import * as meals from './enums/meals'

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

export const printShoppingItem = el => `${el.ingredient.name} (${el.qty}g)`

export const printShoppingList = (list) => {
  const listpp = list.map(printShoppingItem)
  console.log('ShoppingList', JSON.stringify(listpp, null, 4))
}
