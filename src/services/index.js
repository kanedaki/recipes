import createMenuFactory from './create-menu'
import insertMenuAndNutrientsIntoHistoricFactory from './insert-menu-and-nutrients-into-historic'
import calculateMenuNutrientsFactory from './calculate-menu-nutrients'

export default (app, db) => {
  const calculateMenuNutrients = calculateMenuNutrientsFactory(app, db)
  const createMenu = createMenuFactory(app, db, { calculateMenuNutrients })
  const insertMenuAndNutrientsIntoHistoric =
    insertMenuAndNutrientsIntoHistoricFactory(app, db, { calculateMenuNutrients })
  return {
    createMenu,
    insertMenuAndNutrientsIntoHistoric,
    calculateMenuNutrientsFactory,
  }
}
