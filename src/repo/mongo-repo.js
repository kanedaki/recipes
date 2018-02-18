import { MongoClient } from 'mongodb'
import { pathOr, curry } from 'ramda'

/* *************************** Ingredients ********************* */

const findIngredient = curry(async (db, name) => {
  const ingredients = await db.collection('ingredients').find({ name }).project({ _id: 0 }).toArray()
  return ingredients[0]
})

const insertIngredient = curry(async (db, category, subcategory, name, info) => db.collection('ingredients').insertMany([{
  name, category, subcategory, ...info,
}]))


/* *************************** Recipes ********************* */

const getRecipe = curry(async (db, name) => {
  const recipes = await db.collection('recipes').find({ name }).project({ _id: 0 }).limit(1)
    .toArray()
  return recipes[0]
})

const updateRecipe = curry(async (db, recipe) => db.collection('recipes').update(
  { name: recipe.name },
  recipe,
))

const getUserRecipes = curry(async db => db.collection('recipes').find({}).project({ _id: 0 }).toArray())

const insertRecipes = curry(async (db, recipes) => db.collection('recipes').insertMany(recipes))

/* *************************** User ********************* */
const getUser = curry(async (db, username) => {
  const users = await db.collection('users').find({ username }).project({ _id: 0 }).limit(1)
    .toArray()
  return users[0]
})

const insertUser = curry(async (db, username, password, email) => db.collection('users').insertOne({ username, password, email }))

const getUserSettings = curry(async (db, username) => {
  const users = await db.collection('settings').find({ username }).project({ _id: 0 }).limit(1)
    .toArray()
  return pathOr({}, [0], users)
})

const insertUserSettings = curry(async (db, username, description, template) => db.collection('settings').insertOne({ username, description, template }))

const insertUserMenu = curry(async (db, username, menu) => db.collection('userMenus').insertOne({ username, menu }))

const getUserMenu = curry(async (db, username) => {
  const userMenus = await db.collection('userMenus').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return pathOr([], [0, 'menu'], userMenus)
})

const insertUserShoppingList = curry(async (db, username, list) => db.collection('userShoppingList').insertOne({ username, list }))

const getUserShoppingList = curry(async (db, username) => {
  const userList = await db.collection('userShoppingList').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return pathOr([], [0, 'list'], userList)
})

const insertMenuIntoHistoric = curry(async (db, username, menu) => db.collection('historicMenus').insertOne({ username, menu, createdAt: new Date() }))

const insertNutrientsIntoHistoric = curry(async (db, username, nutrients) => db.collection('historicNutrients').insertOne({ username, nutrients, createdAt: new Date() }))

const getUserNutrientsBalance = curry(async (db, username) => {
  const userBalances = await db.collection('userNutrientsBalance').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return pathOr(undefined, [0, 'balance'], userBalances)
})

const insertUserNutrientsBalance = curry(async (db, username, balance) => db.collection('userNutrientsBalance').insertOne({ username, balance }))

export default async function connectToDB() {
  const url = 'mongodb://localhost:27017'
  const dbName = 'recipes'
  const db = await MongoClient.connect(url)
    .then((client) => {
      console.log('Connected successfully to server')
      return client.db(dbName)
    })
    .catch(err => console.log('Error connecting db', err))
  return {
    findIngredient: findIngredient(db),
    insertIngredient: insertIngredient(db),
    getRecipe: getRecipe(db),
    updateRecipe: updateRecipe(db),
    getUserRecipes: getUserRecipes(db),
    insertRecipes: insertRecipes(db),
    getUser: getUser(db),
    insertUser: insertUser(db),
    getUserSettings: getUserSettings(db),
    insertUserSettings: insertUserSettings(db),
    getUserMenu: getUserMenu(db),
    insertUserMenu: insertUserMenu(db),
    getUserShoppingList: getUserShoppingList(db),
    insertUserShoppingList: insertUserShoppingList(db),
    insertMenuIntoHistoric: insertMenuIntoHistoric(db),
    insertNutrientsIntoHistoric: insertNutrientsIntoHistoric(db),
    getUserNutrientsBalance: getUserNutrientsBalance(db),
    insertUserNutrientsBalance: insertUserNutrientsBalance(db),
  }
}
