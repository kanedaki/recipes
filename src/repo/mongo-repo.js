import { MongoClient } from 'mongodb'
import { partial, pathOr } from 'ramda'

/* *************************** Ingredients ********************* */

const findIngredient = async (db, name) => {
  const ingredients = await db.collection('ingredients').find({ name }).project({ _id: 0 }).toArray()
  return ingredients[0]
}

const insertIngredient = async (db, category, subcategory, name, info) => db.collection('ingredients').insertMany([{
  name, category, subcategory, ...info,
}])


/* *************************** Recipes ********************* */

const getRecipe = async (db, name) => {
  const recipes = await db.collection('recipes').find({ name }).project({ _id: 0 }).limit(1)
    .toArray()
  return recipes[0]
}

const updateRecipe = async (db, recipe) => db.collection('recipes').update(
  { name: recipe.name },
  recipe,
)

const getUserRecipes = async db => db.collection('recipes').find({}).project({ _id: 0 }).toArray()

const insertRecipes = async (db, recipes) => db.collection('recipes').insertMany(recipes)

/* *************************** User ********************* */
const getUser = async (db, username) => {
  const users = await db.collection('users').find({ username }).project({ _id: 0 }).limit(1)
    .toArray()
  return users[0]
}

const insertUser = async (db, username, password, email) => db.collection('users').insertOne({ username, password, email })

const getUserSettings = async (db, username) => {
  const users = await db.collection('settings').find({ username }).project({ _id: 0 }).limit(1)
    .toArray()
  return pathOr({}, [0], users)
}

const insertUserSettings = async (db, username, description, template) => db.collection('settings').insertOne({ username, description, template })

const insertUserMenu = async (db, username, menu) => db.collection('userMenus').insertOne({ username, menu })

const getUserMenu = async (db, username) => {
  const userMenus = await db.collection('userMenus').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return pathOr([], [0, 'menu'], userMenus)
}

const insertUserShoppingList = async (db, username, list) => db.collection('userShoppingList').insertOne({ username, list })

const getUserShoppingList = async (db, username) => {
  const userList = await db.collection('userShoppingList').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return pathOr([], [0, 'list'], userList)
}

const insertMenuIntoHistoric = async (db, username, menu) => db.collection('historicMenus').insertOne({ username, menu, createdAt: new Date() })

const insertNutrientsIntoHistoric = async (db, username, nutrients) => db.collection('historicNutrients').insertOne({ username, nutrients, createdAt: new Date() })

const getUserNutrientsBalance = async (db, username) => {
  const userBalances = await db.collection('userNutrientsBalance').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return pathOr(undefined, [0, 'balance'], userBalances)
}

const insertUserNutrientsBalance = async (db, username, balance) => db.collection('userNutrientsBalance').insertOne({ username, balance })

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
    findIngredient: partial(findIngredient, [db]),
    insertIngredient: partial(insertIngredient, [db]),
    getRecipe: partial(getRecipe, [db]),
    updateRecipe: partial(updateRecipe, [db]),
    getUserRecipes: partial(getUserRecipes, [db]),
    insertRecipes: partial(insertRecipes, [db]),
    getUser: partial(getUser, [db]),
    insertUser: partial(insertUser, [db]),
    getUserSettings: partial(getUserSettings, [db]),
    insertUserSettings: partial(insertUserSettings, [db]),
    getUserMenu: partial(getUserMenu, [db]),
    insertUserMenu: partial(insertUserMenu, [db]),
    getUserShoppingList: partial(getUserShoppingList, [db]),
    insertUserShoppingList: partial(insertUserShoppingList, [db]),
    insertMenuIntoHistoric: partial(insertMenuIntoHistoric, [db]),
    insertNutrientsIntoHistoric: partial(insertNutrientsIntoHistoric, [db]),
    getUserNutrientsBalance: partial(getUserNutrientsBalance, [db]),
    insertUserNutrientsBalance: partial(insertUserNutrientsBalance, [db]),
  }
}
