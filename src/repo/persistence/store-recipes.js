import recipes from '../enums/recipes'
import { insertRecipes } from '../mongo-repo'

insertRecipes(recipes)
  .then(() => process.exit())
