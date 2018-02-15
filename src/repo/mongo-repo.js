import { MongoClient } from 'mongodb'

let db

export function connectToDB() {
  const url = 'mongodb://localhost:27017'
  const dbName = 'recipes'
  db = MongoClient.connect(url)
    .then((client) => {
      console.log('Connected successfully to server')
      return client.db(dbName)
    })
    .catch(err => console.log('Error connecting db', err))
  return db
}

export const getDB = () => {
  if (db) {
    return Promise.resolve(db)
  }
  return connectToDB()
}

/* *************************** Ingredients ********************* */

export const findIngredient = async (name) => {
  const db = await getDB()
  const ingredients = await db.collection('ingredients').find({ name }).project({ _id: 0 }).toArray()
  return ingredients[0]
}

export const insertIngredient = async (category, subcategory, name, info) => {
  const db = await getDB()
  return db.collection('ingredients').insertMany([{
    name, category, subcategory, ...info,
  }])
}


/* *************************** Recipes ********************* */

export const getRecipe = async (name) => {
  const db = await getDB()
  const recipes = await db.collection('recipes').find({ name }).project({ _id: 0 }).limit(1)
    .toArray()
  return recipes[0]
}

export const updateRecipe = async (recipe) => {
  const db = await getDB()
  return db.collection('recipes').update(
    { name: recipe.name },
    recipe,
  )
}

export const getUserRecipes = async () => {
  const db = await getDB()
  return db.collection('recipes').find({}).project({ _id: 0 }).toArray()
}

export const insertRecipes = async (recipes) => {
  const db = await getDB()
  return db.collection('recipes').insertMany(recipes)
}

/* *************************** User ********************* */
export const getUser = async (username) => {
  const db = await getDB()
  const users = await db.collection('users').find({ username }).project({ _id: 0 }).limit(1)
    .toArray()
  return users[0]
}

export const insertUser = async (username, password, email) => {
  const db = await getDB()
  return db.collection('users').insertOne({ username, password, email })
}

export const getUserSettings = async (username) => {
  const db = await getDB()
  const users = await db.collection('settings').find({ username }).project({ _id: 0 }).limit(1)
    .toArray()
  return users[0]
}

export const insertUserSettings = async (username, description, template) => {
  const db = await getDB()
  return db.collection('settings').insertOne({ username, description, template })
}

export const insertUserMenu = async (username, menu) => {
  const db = await getDB()
  return db.collection('userMenus').insertOne({ username, menu })
}

export const getUserMenu = async (username) => {
  const db = await getDB()
  const userMenus = await db.collection('userMenus').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return userMenus.length ? userMenus[0].menu : []
}

export const insertUserShoppingList = async (username, list) => {
  const db = await getDB()
  return db.collection('userShoppingList').insertOne({ username, list })
}

export const getUserShoppingList = async (username) => {
  const db = await getDB()
  const userList = await db.collection('userShoppingList').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return userList.length ? userList[0].list : []
}
