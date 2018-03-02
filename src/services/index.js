import createMenuFactory from './create-menu'
import insertMenuAndNutrientsIntoLogFactory from './insert-menu-and-nutrients-into-log'
import calculateMenuNutrientsFactory from './calculate-menu-nutrients'

export default (app, db) => {
  const calculateMenuNutrients = calculateMenuNutrientsFactory(app, db)
  const createMenu = createMenuFactory(app, db, { calculateMenuNutrients })
  const insertMenuAndNutrientsIntoLog =
    insertMenuAndNutrientsIntoLogFactory(app, db, { calculateMenuNutrients })
  return {
    createMenu,
    insertMenuAndNutrientsIntoLog,
    calculateMenuNutrientsFactory,
  }
}
