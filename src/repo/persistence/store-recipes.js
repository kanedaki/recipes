import recipes from './recipes'
import connectToDB from '../mongo-repo'

async function storeRecipes() {
  const db = await connectToDB()
  db.insertRecipes(recipes).then(() => process.exit())
}

storeRecipes()
