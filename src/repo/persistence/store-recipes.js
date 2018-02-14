import recipes from './recipes'
import { insertRecipes } from '../mongo-repo'

insertRecipes(recipes)
  .then(() => process.exit())
