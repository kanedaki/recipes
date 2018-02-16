import menuService from './menu-service'
import foodService from './food-service'
import recipesService from './recipes-service'
import shoppingListService from './shopping-list-service'
import templateService from './template-service'

export default (app, db) => ({
  menu: menuService(app, db),
  food: foodService(app, db),
  recipes: recipesService(app, db),
  shoppingList: shoppingListService(app, db),
  template: templateService(app, db),
})
