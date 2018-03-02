import { mapObjIndexed } from 'ramda'
import { removeNotConsumed } from '../businessLogic/menu'

const factory = (app, {
  getUserNutrientsBalance,
  insertMenuIntoLog,
  insertNutrientsIntoLog,
  insertUserNutrientsBalance,
}, services) => {
  const updateNutrientsAverage = async (username, nutrients) => {
    const currentBalance = await getUserNutrientsBalance(username)
    if (!currentBalance) {
      return insertUserNutrientsBalance(username, nutrients)
    }
    // TODO: sacar a business logic
    const newBalance = mapObjIndexed((value, key) =>
      nutrients[key] * 0.7 + value * 0.3, currentBalance)
    return insertUserNutrientsBalance(username, newBalance)
  }

  const insertMenuAndNutrientsIntoLog = async (username, menu, template) => {
    const consumedMenu = removeNotConsumed(menu, template)
    const nutrients = await services.calculateMenuNutrients(consumedMenu)
    return Promise.all([
      insertMenuIntoLog(username, consumedMenu),
      insertNutrientsIntoLog(username, nutrients),
      updateNutrientsAverage(username, nutrients)])
  }
  return insertMenuAndNutrientsIntoLog
}

export default factory
