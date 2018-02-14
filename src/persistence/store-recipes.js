import { getDB } from '../repo/mongo-repo'
import recipes from '../enums/recipes'


async function storeRecipes(recipes) {
  const db = await getDB()
  return db.collection('recipes').insertMany(recipes)
}

storeRecipes(recipes)
  .then(() => process.exit())
