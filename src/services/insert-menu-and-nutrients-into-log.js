import { removeNotConsumed } from '../businessLogic/menu'
import { updateBalance } from '../businessLogic/constraints/nutrients'

const factory = (app, {
  getUserNutrientsBalance,
  insertMenuIntoLog,
  insertNutrientsIntoLog,
  insertUserNutrientsBalance,
}, services) => {
  const updateNutrientsAverage = async (username, nutrients) => {
    const currentBalance = await getUserNutrientsBalance(username)
    const newBalance = updateBalance(nutrients, currentBalance)
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
