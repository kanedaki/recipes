import { MongoClient, ObjectId } from 'mongodb'
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

const insertIngredientOnlyWithName = async (db, name) => db.collection('ingredients').insertOne({ name })

const findIngredients = async (db, ingredients = []) =>
  db
    .collection('ingredients')
    .find({
      name: { $in: ingredients },
    })
    .toArray()

// const getIngredients = db => db.collection('ingredients').find({}).project({ _id: 0 }).toArray()
const getIngredients = db => db.collection('ingredients').aggregate([
  {
    $project: {
      name: 1,
      category: 1,
      subcategory: 1,
      calories: '$general.calories',
    }
  }
]).toArray()

const getIngredientsNum = db => db.collection('ingredients').count()

const getIngredientsWithPagination = (db, _end, _order, _sort, _start) => {
  const numFields = _end - _start
  const orderSort = _order === 'DESC' ? -1 : 1

  return db.collection('ingredients').aggregate([
    { $sort: { [_sort]: orderSort } },
    { $skip: Number(_start) },
    { $limit: numFields },
    {
      $project:
        {
          name: 1,
          category: 1,
          subcategory: 1,
          calories: '$general.calories',
        }
    }
  ]).toArray()
}

const getIngredientById = (db, id) => db.collection('ingredients').aggregate([
  {
    $match: { _id: ObjectId(`${id}`) }
  },
  {
    $project: {
      name: 1,
      category: 1,
      subcategory: 1,
      general: 1,
      detail: 1,
    }
  }
]).toArray()

const getNumIngredientsWithTheName = (db, name) => db.collection('ingredients').find({ name }).count()

const updateIngredientById = (db, id, ingredient) => db.collection('ingredients').update(
  { _id: ObjectId(`${id}`) }, ingredient)

const deleteIngredientById = (db, id) => db.collection('ingredients').remove({ _id: ObjectId(`${id}`) })

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

const getRecipeById = (db, id) => db.collection('recipes').findOne({ _id: ObjectId(`${id}`) })

const updateRecipe = async (db, recipe) => db.collection('recipes').update(
  { name: recipe.name },
  recipe,
)

const updateRecipeById = (db, id, recipe) => db.collection('recipes').update(
  { _id: ObjectId(`${id}`) }, recipe)

// const getUserRecipes = db => db.collection('recipes').find({}).project({ _id: 0 }).toArray()
const getUserRecipes = db => db.collection('recipes').aggregate([
  {
    $project: {
      id: '$_id',
      _id: 0,
      name: 1,
    }
  }
]).toArray()

const getRecipesNum = db => db.collection('recipes').count()

const getRecipesWithPagination = (db, _end, _order, _sort, _start) => {
  const numFields = _end - _start
  const orderSort = _order === 'DESC' ? -1 : 1

  return db.collection('recipes').aggregate([
    { $sort: { [_sort]: orderSort } },
    { $skip: Number(_start) },
    { $limit: numFields },
    {
      $project: {
        name: 1,
        ingredients: 1,
        meal: 1,
        seasons: 1
      }
    }
  ]).toArray()
}

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
    getRecipesWithPagination: partial(getRecipesWithPagination, [db]),
    getRecipesNum: partial(getRecipesNum, [db]),
    getRecipeById: partial(getRecipeById, [db]),
    updateRecipeById: partial(updateRecipeById, [db]),
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
    getIngredients: partial(getIngredients, [db]),
    getIngredientsNum: partial(getIngredientsNum, [db]),
    getIngredientsWithPagination: partial(getIngredientsWithPagination, [db]),
    getIngredientById: partial(getIngredientById, [db]),
    updateIngredientById: partial(updateIngredientById, [db]),
    deleteIngredientById: partial(deleteIngredientById, [db]),
    getNumIngredientsWithTheName: partial(getNumIngredientsWithTheName, [db]),
    insertIngredientOnlyWithName: partial(insertIngredientOnlyWithName, [db]),
  }
}
