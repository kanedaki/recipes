import { MongoClient } from 'mongodb'
import {
  partial,
  pathOr,
  compose,
  map,
  flatten,
  difference,
  uniq,
} from 'ramda'

/* *************************** Ingredients ********************* */

const findIngredient = async (db, name) => {
  const [
    ingredient,
  ] = await db.collection('ingredients').find({ name }).project({ _id: 0 }).toArray()
  return ingredient
}

const insertIngredient = async (db, category, subcategory, name, info) =>
  db
    .collection('ingredients')
    .insertMany([{
      name,
      category,
      subcategory,
      ...info,
    }])

const findIngredients = async (db, ingredients = []) =>
  db
    .collection('ingredients')
    .find({
      name: { $in: ingredients },
    })
    .toArray()

const insertIngredients = async (db, ingredients = []) => {
  const existingIngredients = (await findIngredients(db, ingredients))
    .map(({ name }) => name)
  const newIngredients = difference(ingredients, existingIngredients)
    .map(name => ({ name, validationPending: true }))
  return newIngredients.length &&
    db
      .collection('ingredients')
      .insert(newIngredients)
}

/* *************************** Recipes ********************* */

const getRecipe = (db, name) => db.collection('recipes').findOne({ name }, { _id: 0 })

const updateRecipe = async (db, recipe) => db.collection('recipes').update(
  { name: recipe.name },
  recipe,
)

const getUserRecipes = db => db.collection('recipes').find({}).project({ _id: 0 }).toArray()

const insertRecipes = (db, recipes) => db.collection('recipes').insertMany(recipes)

const insertRecipesWithIngredients = async (db, recipes) => {
  const extractIngredientNames = compose(
    uniq,
    map(pathOr(undefined, ['ingredient'])),
    flatten,
    map(pathOr([], ['ingredients'])),
  )
  insertIngredients(db, extractIngredientNames(recipes))
  return insertRecipes(db, recipes)
}

/* *************************** User ********************* */
const getUser = (db, username) => db.collection('users').findOne({ username }, { _id: 0, password: 0 })

const insertUser = (db, username, password, email) => db.collection('users').insertOne({ username, password, email })
const updateUser = (db, username, user) => db.collection('users').update({ username }, { $set: user })

const getUserSettings = (db, username) => db.collection('userSettings').findOne({ username }, { _id: 0 }) || {}

const insertUserSettings = (db, username, settings) => db.collection('userSettings').insertOne({ username, ...settings })

const insertUserMenu = (db, username, menu) => db.collection('userMenus').insertOne({ username, menu })

const getUserMenu = async (db, username) => {
  const userMenus = await db.collection('userMenus').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return pathOr([], [0, 'menu'], userMenus)
}

const insertUserShoppingList = (db, username, list) => db.collection('userShoppingList').insertOne({ username, list })

const getUserShoppingList = async (db, username) => {
  const userList = await db.collection('userShoppingList').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return pathOr([], [0, 'list'], userList)
}

const insertMenuIntoLog = (db, username, menu) => db.collection('LogMenus').insertOne({ username, menu, createdAt: new Date() })

const insertNutrientsIntoLog = (db, username, nutrients) => db.collection('LogNutrients').insertOne({ username, nutrients, createdAt: new Date() })

const getUserNutrientsBalance = async (db, username) => {
  const userBalances = await db.collection('userNutrientsBalance').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return pathOr(undefined, [0, 'balance'], userBalances)
}

const insertUserNutrientsBalance = (db, username, balance) => db.collection('userNutrientsBalance').insertOne({ username, balance })

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
    updateUser: partial(updateUser, [db]),
    getUserMenu: partial(getUserMenu, [db]),
    insertUserMenu: partial(insertUserMenu, [db]),
    getUserShoppingList: partial(getUserShoppingList, [db]),
    insertUserShoppingList: partial(insertUserShoppingList, [db]),
    insertMenuIntoLog: partial(insertMenuIntoLog, [db]),
    insertNutrientsIntoLog: partial(insertNutrientsIntoLog, [db]),
    getUserNutrientsBalance: partial(getUserNutrientsBalance, [db]),
    insertUserNutrientsBalance: partial(insertUserNutrientsBalance, [db]),
    insertRecipesWithIngredients: partial(insertRecipesWithIngredients, [db]),
  }
}
